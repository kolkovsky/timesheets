import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { takeUntil, tap, catchError } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

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
  public submitEnabled: boolean = false;
  public unsubscribeStream$: Subject<void> = new Subject();

  constructor(private loginService: LoginService){}

  public ngOnInit(): void {
    this.isSmallScreen = !(window.innerWidth > 1080);
    this.initForm();
  }

  private initForm(): void {
    this.fromGroup = new FormGroup({
      login: new FormControl("", Validators.compose([Validators.required, Validators.maxLength(30)])),
      password: new FormControl("", Validators.compose([Validators.required]))
    });
    this.fromGroup.statusChanges.subscribe(state => {
      this.submitEnabled = "valid" === state.toLowerCase();
    });
  }

  public submitForm(): void {
    if(this.fromGroup.valid) {
      this.submitEnabled = false;
      const login: string = this.fromGroup.controls['login'].value;
      const password: string = this.fromGroup.controls['password'].value;
      this.loginService.sendLoginRequest(login, password).pipe(
        takeUntil(this.unsubscribeStream$),
        tap(() => console.log("Good")),
        catchError(() => {
          this.showErrorNotification = true;
          this.submitEnabled = true;
          return of(null);
        })).subscribe();
    }
  }

  public checkInputState(controlName: string): void {
    const control: AbstractControl = this.fromGroup.controls[controlName];
    if (control &&  control.errors) {
      if(control.errors["required"] && controlName === "login") {
        this.errorLoginMessage = "*это поле является обязательным!";
      }
      if(control.errors["required"] && controlName === "password") {
        this.errorPasswordMessage = "*это поле является обязательным!";
      }
      if(control.errors["maxlength"] && controlName === "login") {
        this.errorLoginMessage = "*максимальное число символов 30"
      }
    } else {
      if(controlName === "login") {
        this.errorLoginMessage = undefined;
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
