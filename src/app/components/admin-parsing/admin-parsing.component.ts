import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminParsingService} from '../../services/admin-parsing.service';
import {Ng4LoadingSpinnerService} from "ng4-loading-spinner";
import {PopupService} from "../../shared/popup/popup.service";
import {PopupTypeConstants} from "../../shared/popup/popup-type.constants";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'admin-parsing',
  templateUrl: './admin-parsing.component.html',
  styleUrls: ['./admin-parsing.component.less']
})

export class AdminParsingComponent implements OnInit, OnDestroy {

  public file: File;
  private formatsExcelFiles: string[] = [".xlsx", ".xls"];
  public showErrorUpload: boolean = false;
  public navigateSubject: Subject<any> = new Subject();
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
    this.loaderService.show();
    this.adminParsingService.importFile(this.file).subscribe((data) => {
      this.loaderService.hide();
      // this.navigateSubject = this.popupService.notificationState$;
      // this.navigateSubject.pipe(takeUntil(this.unsubscribeStream$))
      //   .subscribe((state) => {
      //     if (!state) {
      //       this.router.navigateByUrl("timetable-parsing")
      //     }
      //   });
      this.popupService.showNotification(PopupTypeConstants.SUCCESS_TYPE, true, "Преобразование файла завершено успешно", true);
      this.adminParsingService.importData$.next(data);
      this.router.navigateByUrl("timetable-parsing");
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
