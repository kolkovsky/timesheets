import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

interface CarouselItem {
  header: string;
  description: string;
  imageLink: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public fromGroup: FormGroup;
  public showErrorNotification: boolean;
  public isSmallScreen: boolean;
  public errorLoginMessage: string;
  public errorPasswordMessage: string;

  public ngOnInit(): void {
    this.isSmallScreen = !(window.innerWidth > 1080);
    this.initForm();

    this.fromGroup.statusChanges.subscribe(state => console.log(state));
  }

  private initForm(): void {
    this.fromGroup = new FormGroup({
      login: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  public submitForm(): void {
    this.showErrorNotification = !this.showErrorNotification;
  }

  public getErrorText(controlName: string): string {
    const control: AbstractControl = this.fromGroup.controls[controlName];
    if (control && control.touched && control.errors) {
      console.log(control.errors);
      return "suck"
    }
    return null;
  }


  public checkInputState(controlName: string): void {
    const control: AbstractControl = this.fromGroup.controls[controlName];
    if (control && control.touched && control.errors) {
        if(control.errors["required"] && controlName === "login") {
            this.errorLoginMessage = "*это поле является обязательным!";
        }
        if(control.errors["required"] && controlName === "password") {
          this.errorPasswordMessage = "*это поле является обязательным!";
      }
    }
  }

  public clearErrorMessage(controlName: string): void {
    if(controlName === "password") {
      this.errorPasswordMessage = undefined;
    }
    if(controlName === "login") {
      this.errorLoginMessage = undefined;
    }
  }
}
