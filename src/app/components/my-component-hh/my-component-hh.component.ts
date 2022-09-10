import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  //selector: 'app-my-component-hh',
  selector: '[app-navagation]',
  templateUrl: './my-component-hh.component.html',
  styleUrls: ['./my-component-hh.component.css']
})
export class MyComponentHhComponent implements OnInit {

  @Input() name: string;

  @Output() nameChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log("name==>", this.name)
  }

  onChangeName() {
    this.name = "子组件" + Math.random();
    //修改父组件的值
    //1、双向绑定父组件可以不监听nameChange去修改父组件的name
    //2、单向绑定需要通过监听nameChange去修改父组件的name
    this.nameChange.emit(this.name);
  }

}
