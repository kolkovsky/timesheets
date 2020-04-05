import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ttp-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public fromGroup: FormGroup;

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
    console.log("LOGIN");
  }
}
