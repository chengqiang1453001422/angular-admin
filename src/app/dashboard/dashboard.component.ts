import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //获取dom元素的方法一
  @ViewChild('box') box: ElementRef;
  
  constructor(
    private el:ElementRef,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("route", this.route)
    console.log("location", this.location)
    console.log("router", this.router)
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
}
