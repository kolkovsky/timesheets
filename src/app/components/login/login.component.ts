import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { takeUntil, tap, catchError, finalize } from "rxjs/operators";
import { Subject, of } from "rxjs";
import { Router } from "@angular/router";
import { LoaderService } from "src/app/services/loader.service";

@Component({
  selector: "ttp-login",
  templateUrl: "./login.component.html",
})
export class TtpLoginComponent implements OnInit {
  public fromGroup: FormGroup;
  public showErrorNotification: boolean;
  public isSmallScreen: boolean;
  public errorLoginMessage: string;
  public errorPasswordMessage: string;
  public submitEnabled: boolean;
  private unsubscribeStream$: Subject<void> = new Subject();

  constructor(
    private loginService: LoginService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  public ngOnInit(): void {
    this.isSmallScreen = !(window.innerWidth > 1080);
    this.initForm();
  }

  private initForm(): void {
    this.fromGroup = new FormGroup({
      login: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(30)])
      ),
      password: new FormControl("", Validators.compose([Validators.required])),
    });
    this.fromGroup.statusChanges.subscribe((state) => {
      this.submitEnabled = "valid" === state.toLowerCase();
    });
  }

  public submitForm(): void {
    if (this.fromGroup.valid) {
      this.submitEnabled = false;
      const login: string = this.fromGroup.controls["login"].value;
      const password: string = this.fromGroup.controls["password"].value;
      this.loaderService.showLoader("Loading");
      this.loginService
        .sendLoginRequest(login, password)
        .pipe(
          takeUntil(this.unsubscribeStream$),
          tap(() => this.navigateToWelcomePage()),
          catchError(() => {
            this.showErrorNotification = true;
            this.submitEnabled = true;
            return of(null);
          }),
          finalize(() => this.loaderService.hideSpinner())
        )
        .subscribe();
    }
  }

  private navigateToWelcomePage(): void {
    this.router.navigateByUrl("/home");
  }

  public checkInputState(controlName: string): void {
    const control: AbstractControl = this.fromGroup.controls[controlName];
    if (control && control.errors) {
      if (control.errors["required"] && controlName === "login") {
        this.errorLoginMessage = "*это поле является обязательным!";
      }
      if (control.errors["required"] && controlName === "password") {
        this.errorPasswordMessage = "*это поле является обязательным!";
      }
      if (control.errors["maxlength"] && controlName === "login") {
        this.errorLoginMessage = "*максимальное число символов 30";
      }
    } else {
      if (controlName === "login") {
        this.errorLoginMessage = undefined;
      }
    }
  }

  public clearErrorMessage(controlName: string): void {
    if (controlName === "password") {
      this.errorPasswordMessage = undefined;
    }
    if (controlName === "login") {
      this.errorLoginMessage = undefined;
    }
  }
}
