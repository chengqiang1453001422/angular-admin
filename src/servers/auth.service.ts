import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string | null = null;
  token: string = "";
  userInfo: any = null;
  constructor(
    private router: Router
  ) { }

  getAuthorizationToken(): string {
    return this.token || (localStorage.getItem("token") ? localStorage.getItem("token").toString() : "");
  }

  //登录
  login(data: any) {
    this.token = data.token;
    this.userInfo = data.userInfo;
    this.isLoggedIn = true;
    localStorage.setItem("token", this.token);
    this.router.navigate(["/system"]);
  }

  //退出登录
  logout() {
    this.isLoggedIn = false;
    this.token = "";
    this.userInfo = null;
  }
}
