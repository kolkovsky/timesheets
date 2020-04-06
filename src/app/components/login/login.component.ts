import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface CarouselItem {
  header: string;
  description: string;
  imageLink: string;
}

@Component({
  selector: 'ttp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public fromGroup: FormGroup;
  public carouselContent: any[] = [
    {header: "Hello", description: "Fuck you", imageLink: null}
  ];
  public showErrorNotification: boolean = false;

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.fromGroup = new FormGroup({
      login: new FormControl(Validators.compose([Validators.required])),
      password: new FormControl(Validators.compose([Validators.required]))
    });
  }

  public submitForm(): void {
    this.showErrorNotification = !this.showErrorNotification;
  }
}
