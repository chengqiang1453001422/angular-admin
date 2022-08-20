import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {

httpOptions: any = {
  headers: new HttpHeaders(),
  params: new HttpParams(),
  responseType: "json",
  withCredentials: false
}
constructor(
  private http: HttpClient
) { 
  this.httpOptions.headers.set("tenant_id", "0");
  this.httpOptions.headers.set("X-Access-Token", "");
}

  getUrl(url: string): string {
    return "http://81.69.176.53:8080/jeecg-boot" + url;
  }

  /**
   * get请求
   */
  get(url: string, params?: any): Promise<any> {
    let getUrl = this.getUrl(url);
    if(params) {
      for(let key in params) {
        this.httpOptions.params.set(key, params[key]);
      }
    }
    return this.http.get(getUrl, this.httpOptions).toPromise();
  }

  /**
   * post请求
   */
  post(url: string, body: any, data: any): Promise<any> {
    let postUrl = this.getUrl(url);
    this.httpOptions.params = data;
    return this.http.post(postUrl, body, data).toPromise();
  }
}
