import { Component, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "ttp-banner",
  templateUrl: "./ttp-banner.component.html",
})
export class TtpBannerComponent {
  @Input()
  public template: TemplateRef<any>;

  @Input()
  public visibleTemplate: boolean;
}
