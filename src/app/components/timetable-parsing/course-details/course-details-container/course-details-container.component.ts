import {
  Component,
  ComponentFactoryResolver, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import {CourseDetailsItemComponent} from "../course-details-item/course-details-item.component";
import {CourseDetailsEmptyComponent} from "../course-details-empty/course-details-empty.component";

@Component({
  selector: "course-details-container",
  templateUrl: "./course-details-container.component.html",
  styleUrls: ["./course-details-container.component.less"]
})

export class CourseDetailsContainerComponent implements OnInit {
  @Input() subject: any;
  @ViewChild('courseDetailsContent', {read: ViewContainerRef, static: true}) content: ViewContainerRef;
  @ViewChild('emptyContent', {read: ViewContainerRef, static: true}) emptyContent: ViewContainerRef;


  private component: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    if (this.subject) {
      this.content.clear();
      const factory = this.componentFactoryResolver.resolveComponentFactory(CourseDetailsItemComponent);
      this.component = this.content.createComponent(factory);
      this.component.instance.subject = this.subject;
    } else {
      this.content.clear();
      const factory = this.componentFactoryResolver.resolveComponentFactory(CourseDetailsEmptyComponent);
      const componentRef = this.content.createComponent(factory);
    }
  }

  private createEmptyComponent(): void {
    this.emptyContent.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(CourseDetailsEmptyComponent);
    const componentRef = this.emptyContent.createComponent(factory);
  }

  ngAfterViewInit() {
    let createdComponent = this.elementRef.nativeElement.querySelector('course-details-item');
    if(createdComponent) {
      createdComponent.addEventListener("mousedown", evt => {
        createdComponent.style.zIndex = "1000";
        createdComponent.style.position = "absolute";
        createdComponent.style.pointerEvents = "none";
        this.moveAt(evt.pageX, evt.pageY, createdComponent);
        document.body.addEventListener("mousemove", ev => {
          this.moveAt(ev.pageX, ev.pageY,createdComponent);
        });
        this.createEmptyComponent();
      });

      createdComponent.addEventListener("mouseup", evt => {
        document.removeEventListener("mousemove", ()=>{});
      })
    }
  }

  public moveAt(pageX, pageY, elem): void {
    elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
    elem.style.top = pageY - elem.offsetHeight / 2 + 'px';
  }



}