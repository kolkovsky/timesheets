import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminParsingService} from '../../services/admin-parsing.service';
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {PopupService} from "../../shared/popup/popup.service";
import {PopupTypeConstants} from "../../shared/popup/popup-type.constants";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'admin-parsing',
  templateUrl: './admin-parsing.component.html',
  styleUrls: ['./admin-parsing.component.less']
})

export class AdminParsingComponent implements OnInit, OnDestroy {

  public file: File;
  private formatsExcelFiles: string[] = [".xlsx", ".xls"];
  public showErrorUpload: boolean = false;
  public unsubscribeStream$: Subject<any> = new Subject();

  constructor(private adminParsingService: AdminParsingService,
              private loaderService: Ng4LoadingSpinnerService,
              private popupService: PopupService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  selectFile(event: any): void {
    if (event.target && event.target.files[0]) {
      let file: File = event.target.files[0];
      this.showErrorUpload = !this.formatsExcelFiles.some(format => file.name.includes(format));
      this.file = !this.showErrorUpload ? file : null;
    }
  }

  public sendFile(): void {
    this.adminParsingService.importFile(this.file).subscribe((data) => {
      this.popupService.showNotification(PopupTypeConstants.SUCCESS_TYPE, true, "Преобразование файла завершено успешно", true);
      this.adminParsingService.importData$.next(data);
      setTimeout(() => {
        this.router.navigateByUrl("timetable-parsing");
      }, 2000);
    }, error => {
      this.loaderService.hide();
      this.popupService.showNotification(PopupTypeConstants.DANGER_TYPE, true, "Ошибка преобразования");
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
