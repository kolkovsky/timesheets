import { Component, Input, OnInit } from "@angular/core";
import { LoaderService } from "src/app/services/loader.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "ttp-loader",
  templateUrl: "./ttp-loader.component.html",
})
export class TtpLoaderComponent implements OnInit {
  public backgroundColor: string = "rgba(0, 0, 0, 0.8)";
  public size: string = "medium";
  public color: string = "red";
  public text: string;

  constructor(
    private loaderService: LoaderService,
    private spinnerService: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    this.loaderService.getLoaderObservable().subscribe((loaderState) => {
      if (loaderState.visible) {
        this.text = loaderState.loaderText;
        this.spinnerService.show();
      } else {
        this.spinnerService.hide();
      }
    });
  }
}
