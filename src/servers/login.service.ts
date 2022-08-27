import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";

@Injectable()
export class LoginService {
  constructor(private httpService: HttpService) {}

  useLogin(data) {
    return this.httpService.post("/sys/login", data, {});
  }

  /**
   *
   * @param currdatetime
   * @returns
   */
  imgCode(currdatetime: number) {
    return this.httpService.get("/sys/randomImage/" + currdatetime);
  }
}
