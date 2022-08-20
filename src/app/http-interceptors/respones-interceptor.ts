import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd";
import {tap,finalize} from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(
    private message: NzMessageService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(event => {
        if(event instanceof HttpResponse) {
          console.log("成功", event);
        }
      }, error => {
        //this.onError(error);
        console.log("失败", error);
      }),
      finalize(() => {
        //请求完成
        console.log("请求完成");
      })
    );
  }

  onError(response: any) {
    console.log("onError", response)
    const { status, message } = response.error;
    switch(status) {
      case 403:
        this.message.create("error", "拒绝访问");
        break;
      case 404:
        this.message.create("error", "很抱歉，资源未找到");
        break;
      case 504:
        this.message.create("error", "网络超时");
        break;
      case 401:
        this.message.create("error", "未授权，请重新登录");
        this.router.navigate(["/login"]);
        break;
      case 500:
        this.message.create("error", "登录已过期");
        this.router.navigate(["/login"]);
        break;
      default: 
        this.message.create("error", message);
    }
  }
}