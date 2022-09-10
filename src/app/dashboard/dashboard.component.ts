import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, TemplateRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SelectAccountComponent } from '../components/selectAccount/selectAccount.component';
import { FieldItem, fieldList } from 'src/mode/formItem';
import { UserInfo } from 'src/mode/product';
import { LoggerService } from 'src/provides/Logger.service';
import { AppConfig, APP_CONFIG } from '../config/app.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //获取dom元素的方法一
  @ViewChild('box') box: ElementRef;
  @ViewChild('com') com: ElementRef;
  @ViewChild('mydiv', {read: TemplateRef}) mydiv: TemplateRef<any> = null!;
  //@ViewChild('card') card: ViewContainerRef;
  @ViewChild('card', { read: ViewContainerRef }) container: ViewContainerRef = null!;
  

  formList: FieldItem[] = fieldList;

  color = "yellow";

  name = "我是父组件的值";
  
  constructor(
    private el:ElementRef,
    private route: ActivatedRoute,
    private location: Location,
    private loggerService: LoggerService,
    @Inject(APP_CONFIG) config: AppConfig,
    private resolver: ComponentFactoryResolver,
    private router: Router
  ) { 
    console.log("config==>", config)
  }

  ngOnInit() {
    console.log("this.loggerService", this.loggerService)
    let userInfo = new UserInfo("998");
    userInfo.name = "667";
    let userInfo1 = new UserInfo();
    console.log("userInfo", userInfo, userInfo1)
    // console.log("box",this.box, this.color)
    // console.log("com",this.com)
    // console.log("container", this.container)
    // console.log("route", this.route)
    // console.log("location", this.location)
    // console.log("router", this.router)
    this.container.createEmbeddedView(this.mydiv);
    const factory = this.resolver.resolveComponentFactory(SelectAccountComponent)
    this.container.createComponent(factory);
  }

  onChangeName() {
    //this.name = "父组件" + Math.random();
  }

  clearDiv() {
    this.container.clear();
  }

  addDiv() {
    const factory = this.resolver.resolveComponentFactory(SelectAccountComponent)
    this.container.createComponent(factory);
  }

  GenerateKeyPage = (e) =>{
    console.log(e)
    e.preventDefault();
  }

  jumpPage() {
    //this.location.back();
    this.router.navigate(["/feedback"], {
      queryParams: {
        id: "001",
        name: "成强"
      }
    })
  }

  formSubmit(data) {
    console.log("子组件传递的值", data)
  }
}
