import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  //#heroForm: 模板变量 heroForm 现在是对 NgForm 指令实例的引用，该指令实例管理整个表单。
  //#name: 模板引用变量（#name）设置为 "ngModel"，因为 "ngModel" 是 NgModel.exportAs 属性的值。这个属性告诉 Angular 如何把引用变量和指令链接起来。
  powers = ['上海', '北京', '浦东'];

  model = {
    number: "",
    name: "",
    power: "",
    alterEgo: "nihao"
  }
  id: String
  index: String

  ngOnInit() {
    console.log("route", this.route)
    // localhost:4200/heroes/12  输出12
    //this.route.paramMap.subscribe(hero => console.log(hero.get("id")));
    // localhost:4200/heroes/name=张三  输出张三
    //this.route.queryParamMap.subscribe(hero => console.log(hero.get("name")))
    
    //方法一
    this.id = this.route.snapshot.paramMap.get('id')
    console.log("id", this.id)

    //方法二
    this.route.queryParams.subscribe(res=>{
      this.index = res.id;
      console.log(res.id,this.index);
    })
  }

  submitted = false;

  onSubmit() { 
    this.submitted = true; 
    console.log(this.model)
  }

  newHero() {
    //this.model = new Hero(42, '', '');
  }

}
