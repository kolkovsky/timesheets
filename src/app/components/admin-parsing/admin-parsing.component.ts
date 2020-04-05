import {Component, OnDestroy} from '@angular/core';
import {AdminParsingService} from '../../services/admin-parsing.service';
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {PopupService} from '../../shared/popup/popup.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'admin-parsing',
  templateUrl: './admin-parsing.component.html'
})
export class AdminParsingComponent implements OnDestroy {
  public fileSize: number;
  public showErrorUpload: boolean = false;
  public unsubscribeStream$: Subject<any> = new Subject();
  private file: File;
  private formatsExcelFiles: string[] = ['.xlsx', '.xls'];
  public add:boolean;

  constructor(private adminParsingService: AdminParsingService,
              private loaderService: Ng4LoadingSpinnerService,
              private popupService: PopupService,
              private router: Router) {
  }

  public selectFile(event: any): void {
    if (event.target && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.showErrorUpload = !this.formatsExcelFiles.some(format => file.name.includes(format));
      this.file = !this.showErrorUpload ? file : null;
      if (this.file) {
        this.fileSize = this.file.size;
      }
    }
  }

  public sendFile(): void {
    this.adminParsingService.importFile(this.file).subscribe((data) => {
      this.adminParsingService.importData$.next(data);
      setTimeout(() => {
        this.router.navigateByUrl('timetable-parsing');
      }, 2000);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
