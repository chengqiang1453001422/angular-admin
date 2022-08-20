import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, TemplateRef, ComponentFactoryResolver, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SelectAccountComponent } from '../components/selectAccount/selectAccount.component';
import { FieldItem, fieldList } from 'src/mode/formItem';
import { UserInfo } from 'src/mode/product';
import { LoggerService } from 'src/provides/Logger.service';
import { AppConfig, APP_CONFIG } from '../config/app.config';
import { EChartsOption } from 'echarts';

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

  option: EChartsOption = {
    //color: ["#00A0E8", "#40B8EE", "#ABE0F8"],
    color: ["#E0E7EB", "#ECF1F3", "#F3F5F7"],
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false,
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '收入来源',
        type: 'pie',
        radius: ['40%', '70%'],
        startAngle: "-110",
        silent: true,
        data: [
          { value: 0, name: '营销活动' },
          { value: 0, name: '自动化' },
          { value: 0, name: '其他' },
        ],
        label: {
          show: true,
          position: "outside",
          formatter: (data) => {
            return [data.name, data.value + "%"].join("\n");
          },
          color: "#646A73",
          lineHeight: 20,
        },
        labelLine: {
          show: true,
          length: 20,
          length2: 20
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        markPoint: {
          data: [
            {
              symbol: "react",
              symbolSize: [100, 50],
              name: "共交易额",
              value: 0,
              x: "50%",
              y: "50%",
              label: {
                formatter: (data) => {
                  console.log("哈哈哈==>", data)
                  return "{a|" + data.name + "}\n{b|$" + data.value + "}";
                },
                rich: {
                  a: {
                    color: "#8F959E",
                    lineHeight: 24,
                    fontSize: 14
                  },
                  b: {
                    color: "#1F2329",
                    lineHeigt: 28,
                    fontSize: 20,
                    fontWight: "bold"
                  }
                },
                position: ['50%', '50%'],
                color: "#000",
                align: "center",
                verticalAlign: "middle",
              },
              itemStyle: {
                color: "transparent"
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            }
          ]
        }
      }
    ]
  };

  chartOption: EChartsOption = {
    color: ['#00A0E8', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#00f'],
    legend: {
      show: true,
      left: "left",
      textStyle: {
        color: "#646A73"
      },
      data: [
        {
          name: "联系人数"
        }
      ]
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      show: false,
      left: '10%',
      top: 40,
      right: 10,
      bottom: '10%',
      containLabel: false
    },
    xAxis: {
      name: "",
      nameLocation: "start",
      nameTextStyle: {
        color: "#8F959E",
      },
      show: true,
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLine: { //坐标轴线
        show: true,
        lineStyle: {
          color: "#BBBFC4"
        }
      },
      axisTick: { //刻度线
        show: true,
        length: 4,
        alignWithLabel: true,
        inside: true,
        lineStyle: {
          color: "#BBBFC4"
        }
      },
      axisLabel: { //刻度文案
        show: true,
        color: "#8F959E"
      },
      splitLine: { //分割线
        show: false,
        lineStyle: {
          color: ["#F1F3F9"],
          width: 0.5
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: { //坐标轴线
        show: false,
        lineStyle: {
          color: "#BBBFC4"
        }
      },
      axisTick: { //刻度线
        show: false,
        length: 4,
        alignWithLabel: true,
        inside: false,
        lineStyle: {
          color: "#BBBFC4"
        }
      },
      axisLabel: { //刻度文案
        show: true,
        color: "#8F959E",
        formatter: (value, index) => {
          console.log("刻度文案==>", value, index);
          if (index > 0 && false) {
            return "";
          } else {
            return value;
          }
        }
      },
      splitLine: { //分割线
        show: true,
        lineStyle: {
          color: ["#F1F3F9"],
          width: 1
        }
      }
    },
    series: [
      {
        data: [82, 93, 90, 34, 29, 30, 132],
        type: 'line',
        name: "联系人数",
        itemStyle: {
          opacity: 1
        },
        lineStyle: {
          opacity: 1
        }
      },
      {
        data: [20, 78, 91, 34, 90, 30, 32],
        type: 'line',
        name: "点击率",
        itemStyle: {
          opacity: 1
        },
        lineStyle: {
          opacity: 1
        }
      },
      {
        data: [45, 45, 67, 98, 67, 45, 65],
        type: 'line',
        name: "订单转化率",
        itemStyle: {
          opacity: 1
        },
        lineStyle: {
          opacity: 1
        }
      },
    ],
  };
  
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
