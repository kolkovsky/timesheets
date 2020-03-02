import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminParsingService} from '../../services/admin-parsing.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {PopupService} from '../../shared/popup/popup.service';
import {PopupTypeConstants} from '../../shared/popup/popup-type.constants';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {StateInterface} from '../../interfaces/state.interface';
import {StateService} from '../../services/state.service';

@Component({
  selector: 'admin-parsing',
  templateUrl: './admin-parsing.component.html'
})
export class AdminParsingComponent implements OnInit, OnDestroy {

  public file: File;
  private formatsExcelFiles: string[] = ['.xlsx', '.xls'];
  public showErrorUpload: boolean = false;
  public unsubscribeStream$: Subject<any> = new Subject();

  constructor(private adminParsingService: AdminParsingService,
              private loaderService: Ng4LoadingSpinnerService,
              private popupService: PopupService,
              private router: Router,
              protected stateService: StateService) {
  }

  public ngOnInit(): void {
  }

  public selectFile(event: any): void {
    if (event.target && event.target.files[0]) {
      let file: File = event.target.files[0];
      this.showErrorUpload = !this.formatsExcelFiles.some(format => file.name.includes(format));
      this.file = !this.showErrorUpload ? file : null;
    }
  }

  public processState(state: StateInterface): void {
    console.log('Fuck you NgRx!!!');
  }

  public sendFile(): void {
    console.log(this.file);
    this.adminParsingService.importFile(this.file).subscribe((data) => {
      this.popupService.showNotification(PopupTypeConstants.SUCCESS_TYPE, true, 'Преобразование файла завершено успешно', true);
      this.adminParsingService.importData$.next(data);
      setTimeout(() => {
        this.router.navigateByUrl('timetable-parsing');
      }, 2000);
    }, error => {
      this.loaderService.hide();
      this.popupService.showNotification(PopupTypeConstants.DANGER_TYPE, true, 'Ошибка преобразования');
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
