import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //获取dom元素的方法一
  @ViewChild('box') box: ElementRef;
  constructor(private el:ElementRef) { }

  ngOnInit() {
    console.log(this.box.nativeElement.innerHTML);
    console.log(this.el.nativeElement);
    console.log(this.el.nativeElement.querySelector('.box').innerHTML);
  }

  GenerateKeyPage = (e) =>{
    console.log(e)
    e.preventDefault();
    alert(6666)
  }
}
