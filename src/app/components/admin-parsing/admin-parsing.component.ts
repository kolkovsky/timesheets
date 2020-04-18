import { Component, OnDestroy } from "@angular/core";
import { AdminParsingService } from "../../services/admin-parsing.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { LoaderService } from "src/app/services/loader.service";
import { finalize } from "rxjs/operators";

@Component({
  selector: "admin-parsing",
  templateUrl: "./admin-parsing.component.html",
})
export class AdminParsingComponent implements OnDestroy {
  public fileSize: number;
  public add: boolean;
  public showErrorUpload: boolean = false;
  public file: File;
  public unsubscribeStream$: Subject<any> = new Subject();
  private readonly formatsExcelFiles: string[] = [".xlsx", ".xls"];

  constructor(
    private adminParsingService: AdminParsingService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  public selectFile(event: any): void {
    if (event.target && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.showErrorUpload = !this.formatsExcelFiles.some((format) =>
        file.name.includes(format)
      );
      this.file = !this.showErrorUpload ? file : null;
      if (this.file) {
        this.fileSize = this.file.size;
      }
    }
  }

  public sendFile(): void {
    this.loaderService.showDefaultLoader("Parsing");
    this.adminParsingService
      .importFile(this.file)
      .pipe(finalize(() => this.loaderService.hideSpinner()))
      .subscribe(() => {
        //todo ask for navigate on other page
      });
  }

  public ngOnDestroy(): void {
    this.unsubscribeStream$.next();
    this.unsubscribeStream$.complete();
  }
}
