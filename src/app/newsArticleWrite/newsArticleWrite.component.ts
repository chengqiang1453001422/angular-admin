import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DictService } from '../../servers/dict.service';

enum DictKeyEnum {
  LEVEL = "news_article_level",
  ARTICLETYPE = "news_manuscript_type",
  PUBLIC = "yn"
}
interface DictOptions {
  value: string;
  text: string;
  title: string;
}
class Point {
  x: number;
  y: number;
}
@Component({
  selector: 'app-newsArticleWrite',
  templateUrl: './newsArticleWrite.component.html',
  styleUrls: ['./newsArticleWrite.component.scss']
})
export class NewsArticleWriteComponent implements OnInit {
  validateForm: FormGroup;
  levelOptions: DictOptions[] = [];
  manuscriptOptions: DictOptions[] = [];
  publicOptions: DictOptions[] = [];
  level: string = "";
  private searchText$ = new Subject<string>();
  subject = new Subject<string>();
  constructor(
    private fb: FormBuilder,
    private dictService: DictService
  ) { }

  ngOnInit() {
    let obj = new Point();
    console.log(obj)
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      level: [null],
      manuscriptType: [null],
      isPublic: [null],
      happenAddress: [null],
      happenDate: [null],
      keywords: [null],
      content: [null]
    })
    this.initDictOptions();
    this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(packageName => {
        console.log("输出了", packageName)
        return Promise.resolve(packageName).then(value => {
          console.log("456",value)
        })
      })
    ).toPromise().then(value => {
      console.log("8889")
    });
    // this.searchText$.pipe(debounceTime(500)).subscribe((value) => {
    //   console.log("输出了", value)
    // });
    // this.subject.pipe(debounceTime(500)).subscribe(() => {
    //   console.log('防抖操作');
    //   this.pageQueryProject();
    // });
    this.subject.pipe(
      debounceTime(500),
      //distinctUntilChanged(),
      switchMap(packageName => {
        console.log("输出了", packageName)
        return Promise.resolve(packageName)
      })
    );
  }

  // 分页操作
  pageQueryProject(): void {
    console.log('请求数据操作');
  } 

  // 点击按钮下侧发生变化 左右
  getitem(index: any): any {
    this.subject.next();
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  serach(value) {
    console.log(value)
    this.searchText$.next(value);
  }

  initDictOptions() {
    this.dictService.getDictData(DictKeyEnum.LEVEL).then((data: DictOptions[]) => {
      this.levelOptions = data;
    });
    this.dictService.getDictData(DictKeyEnum.ARTICLETYPE).then((data: DictOptions[]) => {
      this.manuscriptOptions = data;
    });
    this.dictService.getDictData(DictKeyEnum.PUBLIC).then((data: DictOptions[]) => {
      this.publicOptions = data;
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  onOk() {
      
  }

  save() {
    console.log(this.validateForm.value)
  }

  onContentChanged(data) {
    console.log("onContentChanged", data)
    this.validateForm.get("content").setValue(data.html);
  }

}
