import { Component, OnDestroy } from "@angular/core";
import { FileService } from "../../services/file.service";
import { Subject, of } from "rxjs";
import { LoaderService } from "src/app/services/loader.service";
import { finalize, tap, catchError, takeUntil } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { TtpBaseComponent } from "src/app/ng-core/ttp-base.component";
import { StateService } from "src/app/services/state.service";
import { State } from "src/app/interfaces/state.interface";
import { States } from "src/app/constants/states";
import { saveAs } from "file-saver";

@Component({
  selector: "ttp-file-parsing",
  templateUrl: "./file-parsing.component.html",
})
export class TtpFileParsingComponent extends TtpBaseComponent
  implements OnDestroy {
  public file: File;
  public fileSize: number;
  public uploadedFiles: File[];
  public showErrorUpload: boolean;
  public visibleNotification: boolean;
  public visibleAllUploadedFilesModal: boolean;
  public unsubscribeStream$: Subject<any> = new Subject();
  private readonly formatsExcelFiles: string[] = [".xlsx", ".xls"];

  constructor(
    public stateService: StateService,
    private fileService: FileService,
    private loaderService: LoaderService
  ) {
    super(stateService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.loaderService.showLoader("Загрузка");
    this.fileService
      .getAllUploadedFiles()
      .pipe(
        tap((files: File[]) => {
          this.uploadedFiles = files;
        }),
        takeUntil(this.unsubscribeStream$),
        finalize(() => this.loaderService.hideSpinner())
      )
      .subscribe();
  }

  public selectFile(event: any): void {
    if (event.target && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.showErrorUpload = !this.formatsExcelFiles.some((format) =>
        file.name.includes(format)
      );
      this.file = !this.showErrorUpload ? file : null;
      if (this.file) {
        //For stub getting uploaded Files
        this.uploadedFiles.push(this.file);
        this.uploadedFiles.push(this.file);
        this.uploadedFiles.push(this.file);
        this.uploadedFiles.push(this.file);
        this.uploadedFiles.push(this.file);
        this.uploadedFiles.push(this.file);
        this.fileSize = this.file.size;
      }
    }
  }

  public sendFile(): void {
    this.loaderService.showLoader("Parsing");
    this.fileService
      .importFile(this.file)
      .pipe(
        tap((response) => {
          this.visibleNotification = false;
          this.fileService.importData$.next(response);
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

  public closeAllUploadedFilesPopup(): void {
    this.visibleAllUploadedFilesModal = false;
  }

  public saveFile(blobContent: Blob, fileName: string): void {
    console.log(blobContent);
    const blob = new Blob([blobContent], { type: "application/json" });
    saveAs(blob, fileName);
  }

  public removeFile(file: File): void {
    console.log(file);
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(file), 1);
  }

  public ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
