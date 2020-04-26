import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { AdminParsingService } from "../../services/admin-parsing.service";
import { Router } from "@angular/router";
import { Subject, of } from "rxjs";
import { LoaderService } from "src/app/services/loader.service";
import { finalize, tap, catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { StateService } from "src/app/services/state.service";
import { State } from "src/app/interfaces/state.interface";
import { States } from "src/app/constants/states";

@Component({
  selector: "ttp-file-parsing",
  templateUrl: "./file-parsing.component.html",
})
export class TtpFileParsingComponent extends TtpBaseComponent
  implements OnDestroy {
  public fileSize: number;
  public file: File;
  public files: File[] = [];
  public showErrorUpload: boolean;
  public visibleNotification: boolean;
  public visibleAllUploadedFilesModal: boolean;
  public unsubscribeStream$: Subject<any> = new Subject();
  private readonly formatsExcelFiles: string[] = [".xlsx", ".xls"];

  constructor(
    public stateService: StateService,
    private adminParsingService: AdminParsingService,
    private loaderService: LoaderService
  ) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
  }

  public selectFile(event: any): void {
    if (event.target && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.showErrorUpload = !this.formatsExcelFiles.some((format) =>
        file.name.includes(format)
      );
      this.file = !this.showErrorUpload ? file : null;
      if (this.file) {
        this.files.push(file);
        this.files.push(file);
        this.files.push(file);
        this.files.push(file);
        this.files.push(file);
        this.files.push(file);
        this.files.push(file);
        this.files.push(file);
        this.files.push(file);
        this.files.push(file);
        this.files.push(file);
        this.fileSize = this.file.size;
      }
    }
  }

  public sendFile(): void {
    this.loaderService.showDefaultLoader("Parsing");
    this.adminParsingService
      .importFile(this.file)
      .pipe(
        tap((response) => {
          this.visibleNotification = false;
          this.adminParsingService.importData$.next(response);
        }),
        catchError((error: HttpErrorResponse) => {
          this.visibleNotification = true;
          return of(null);
        }),
        finalize(() => this.loaderService.hideSpinner())
      )
      .subscribe();
  }

  public processState(state: State): void {
    const stateName: string = state.payload.stateName;
    switch (stateName) {
      case States.showAllUploadedFilesModal:
        this.visibleAllUploadedFilesModal = true;
        break;
      default:
        break;
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
