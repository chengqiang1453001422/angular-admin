import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class DictService {
  dictDataCatch: any = {};
  constructor(
    private httpService: HttpService
  ) { }

  //根据字典获取值
  getDictData(dictKey: string): Promise<any> {
    return new Promise((reslove, reject) => {
      //优先从缓存中读取字典配置
      if(this.dictDataCatch[dictKey]) {
        reslove(this.dictDataCatch[dictKey]);
      }else{
        this.httpService.get("/sys/dict/getDictItems/" + dictKey).then(res => {
          if(res.code === 0) {
            this.dictDataCatch[dictKey] = res.result;
            reslove(res.result);
          }else{
            reject([]);
          }
        })
      }
    });
  }

  serach(value) {
    console.log("哈哈哈")
    return Promise.resolve(value);
  }
}
