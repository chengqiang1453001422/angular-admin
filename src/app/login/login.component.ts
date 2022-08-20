import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../servers/login.service';
import { AuthService } from '../../servers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  randCodeImage: string = "";
  currdatetime: number;
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(!this.validateForm.errors) {
      this.useLogin();
    }
  }

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      remember_me: [true]
    });
    this.handleChangeCheckCode();
  }

  handleChangeCheckCode() {
    this.currdatetime = new Date().getTime();
    this.loginService.imgCode(this.currdatetime).then(res => {
      this.randCodeImage = res.result;
    })
  }

  useLogin() {
    this.loginService.useLogin({
      checkKey: this.currdatetime,
      ...this.validateForm.value
    }).then(res => {
      if(res.code === 200) {
        this.authService.login(res.result);
      }else{
        this.handleChangeCheckCode()
      }
    })
  }
}
