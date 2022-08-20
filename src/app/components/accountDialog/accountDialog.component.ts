import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accountDialog',
  templateUrl: './accountDialog.component.html',
  styleUrls: ['./accountDialog.component.css']
})
export class AccountDialogComponent implements OnInit {
  //获取dom元素的方法一
  @ViewChild('box') box: ElementRef;
  constructor(
    private el:ElementRef,
  ) { }

  ngOnInit() {
    console.log(this.box.nativeElement.innerHTML);
    console.log(this.el.nativeElement);
    console.log(this.el.nativeElement.querySelector('.box').innerHTML);
  }

}
