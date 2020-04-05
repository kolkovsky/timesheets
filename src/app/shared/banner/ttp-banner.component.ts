import {AfterContentInit, Component, ContentChild, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ttp-banner',
  templateUrl: './ttp-banner.component.html'
})
export class TtpBannerComponent implements OnInit, AfterContentInit {
  @Input()
  public visibleContent: boolean = false;

  @ContentChild('header', {static: false})
  public content: ElementRef;

  ngAfterContentInit(): void {
    console.log(this.content);
  }

  public ngOnInit(): void {
    console.log(1)
  }

}
