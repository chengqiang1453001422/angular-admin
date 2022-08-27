/*
 * @Author: 成强 
 * @Date: 2019-07-01 17:11:32
 * @LastEditors: 成强 
 * @LastEditTime: 2022-08-27 23:52:24
 * @FilePath: /angular-admin/src/app/user/user.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FilterItem } from 'src/mode/product';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //this.initFilterList(this.saveData);
    this.addFilter();
    console.log("生成的数据", this.filterCondtionList)

    console.log("filterList", this.filterList)
  }

  filterData = [
    {
      id: "user_braver",
      name: "用户行为",
      permiss: [
        {
          id: "car_to_buy",
          name: "购买商品数量",
          valueType: "number",
          extra: true,
          opreat: [">=", "=", "<"],
          opreatList: [
            { id: ">=", name: "大于等于"},
            { id: "=", name: "等于"},
            { id: "<", name: "小于"}
          ]
        },
        {
          id: "seek_to",
          name: "浏览数量",
          valueType: "number",
          extra: true,
          opreat: [">=", "=", "<"],
          opreatList: [
            { id: ">=", name: "大于等于"},
            { id: "=", name: "等于"},
            { id: "<", name: "小于"}
          ]
        }
      ]
    },
    {
      id: "user_attrbiue",
      name: "用户属性",
      permiss: [
        {
          id: "coutry",
          name: "国家",
          valueType: "number",
          extra: true,
          opreat: [">=", "=", "<"],
          opreatList: [
            { id: "in", name: "在"},
            { id: "!in", name: "不在"},
          ]
        },
      ]
    }
  ];

  dateFilterList = [
    {id: "this_mounth", name: "当月"},
    {id: "<", name: "早于"},
    {id: "in", name: "介于"}
  ]

  confirmDate = ["this_mounth"];

  rangedate = ["in"];

  listOfOption = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'disabled', value: 'disabled', disabled: true }
  ];
  
  filterList = [
    [
      {
        fieldName: "auditer",
        fieldValue: "user_braver",
        fieldType: "select",
        fieldValueType: "",
        optionsList: this.filterData,
        fieldList: [
          {
            fieldName: "code",
            fieldValue: "car_to_buy",
            fieldType: "select",
            fieldValueType: "number",
            optionsList: this.filterData[0].permiss,
          },
          {
            fieldName: "opreat",
            fieldValue: ">=",
            fieldType: "select",
            fieldValueType: "",
            optionsList: this.filterData[0].permiss[0].opreatList,
          },
          {
            fieldName: "value",
            fieldValue: "78",
            fieldType: "inputNumber",
            fieldValueType: "",
            optionsList: [],
          },
          {
            fieldName: "timerFrameType",
            fieldValue: "this_mounth",
            fieldType: "select",
            fieldValueType: "confirmDate", //date dateRange confirmDate
            optionsList: this.dateFilterList,
          }
        ]
      },
      {
        fieldName: "auditer",
        fieldValue: "user_attrbiue",
        fieldType: "select",
        fieldValueType: "",
        optionsList: this.filterData,
        fieldList: [
          {
            fieldName: "code",
            fieldValue: "car_to_buy",
            fieldType: "select",
            fieldValueType: "number",
            optionsList: this.filterData[0].permiss,
          }
        ]
      }
    ]
  ]

  saveData = [
    [
      {
        auditer: "user_braver",
        code: "car_to_buy",
        opreat: ">=",
        value: "78",
        timerFrame: {
          type: "this_mounth",
        }
      },
      {
        auditer: "user_braver",
        code: "car_to_buy",
        opreat: ">=",
        value: "78",
        timerFrame: {
          type: "<",
          startDate: "2022-8-23"
        }
      }
    ],
    [
      {
        auditer: "user_braver",
        code: "seek_to",
        opreat: ">=",
        value: "78",
        timerFrame: {
          type: "in",
          startDate: "2022-8-23",
          endDate: "2022-12-22"
        }
      }
    ]
  ]

  filterCondtionList = [];

  initFilterList(data, isAnd = false, arr = []) {
    data.forEach(item => {
      if (Array.isArray(item)) {
        this.initFilterList(item, true, arr);
      } else {
        arr.push(this.addAndFilter(item));
      }
      if (!isAnd && arr.length > 0) {
        this.filterCondtionList.push(arr);
        arr = [];
      }
    })
  }

  onSelectChange(data, arr) {
    console.log("onSelectChange", data, arr)
    if (data.fieldName == "auditer") {
      // auditer
      data.fieldList.find(item => item.fieldName == "code").optionsList = data.optionsList.find(item => item.id == data.fieldValue).permiss;
    } else if (data.fieldName == "code") {
      // code
      arr.find(item => item.fieldName == "opreat").optionsList = data.optionsList.find(item => item.id == data.fieldValue).opreatList;
    }
  }

  deleteFilter(type, index: number, arr: Array<any>) {
    if (type == "and") {
      if (arr.length !== 1) {
        arr.splice(index, 1);
      }
    } else {
      if (this.filterCondtionList.length == 1) {
        console.log("最后一个了！！！")
        return;
      } else {
        this.filterCondtionList.splice(index, 1);
      }
    }
  }

  addFilter(type?, arr?: Array<any>) {
    if (type == "and") {
      arr.push(this.addAndFilter());
    } else {
      let filterItem = this.addOrFilter();
      filterItem.push(this.addAndFilter());
      this.filterCondtionList.push(filterItem);
    }

  }

  addOrFilter() {
    return [];
  }

  addAndFilter(data?) {
    data = data || {
      auditer: "user_braver",
      code: null,
      opreat: null,
      value: "",
      timerFrame: {
        type: null,
        startDate: "",
        endDate: ""
      }
    };
    let filterItem;
    let fieldList = [];
    let permiss = this.filterData.find(item => item.id == data.auditer).permiss;
    // auditer
    filterItem = new FilterItem("auditer", data.auditer, "select", "", this.filterData);

    // code
    let codeItem = permiss.find(item => item.id == data.code);
    let valueType = codeItem ? codeItem.valueType : "number";
    fieldList.push(new FilterItem("code", data.code, "select", valueType, permiss));

    // opreat
    let opreat = codeItem ? codeItem.opreat : [];
    fieldList.push(new FilterItem("opreat", data.opreat, "select", "", opreat));

    // value
    let fieldValueType = "input";
    switch (valueType) {
      case "input":
        fieldValueType = "input";
        break;
      case "number":
        fieldValueType = "inputNumber";
        break;
      default:
        fieldValueType = "select";
        break;
    }
    fieldList.push(new FilterItem("value", data.value, fieldValueType, "", []))

    // timerFrame
    if (true) {
      const { type, startDate, endDate } = data.timerFrame;
      if (this.confirmDate.includes(type)) {
        // 固定日期
        fieldList.push(new FilterItem("timerFrameType", type, "select", "confirmDate", this.dateFilterList));
      } else if (this.rangedate.includes(type)) {
        // 区间日期
        fieldList.push(new FilterItem("timerFrameType", type, "select", "dateRange", this.dateFilterList));
        fieldList.push(new FilterItem("timerFrameValue", [startDate, endDate], "dateRange", "dateRange", []));
      } else {
        // 普通日期
        fieldList.push(new FilterItem("timerFrameType", type, "select", "date", this.dateFilterList));
        fieldList.push(new FilterItem("timerFrameValue", startDate, "date", "date", []));
      }
    }

    // for (let key in data) {
    //   let index = this.filterData.findIndex(item => item.id == data[key]);
    //   if (key == "auditer") {
    //     // 一级
    //     filterItem = new FilterItem(key, data[key], "select", "", this.getOptionsList(data[key], []));
    //   } else if (key == "code") { 
    //     // 二级
    //     fieldList.push(new FilterItem(key, data[key], "select", "", this.getOptionsList(data[key], [data.auditer])));
    //   } else if (key == "timerFrame") {
    //     // 日期处理
    //     if (this.confirmDate.includes(data[key]?.type)) {
    //       // 固定日期
    //       fieldList.push(new FilterItem("timerFrameType", data[key], "select", "confirmDate", this.dateFilterList));
    //     } else if (this.rangedate.includes(data[key]?.type)) {
    //       // 区间日期
    //       fieldList.push(new FilterItem("timerFrameType", data[key], "select", "dateRange", this.dateFilterList));
    //       fieldList.push(new FilterItem("timerFrameValue", [data[key].startDate, data[key].endDate], "dateRange", "dateRange", []));
    //     } else {
    //       fieldList.push(new FilterItem("timerFrameType", data[key], "select", "date", this.dateFilterList));
    //       fieldList.push(new FilterItem("timerFrameValue", data[key].startDate, "date", "date", []));
    //     }
    //   } else {
    //     if (index !== -1) {
    //       // 一级
    //     } else {
    //       // 二级
    //       fieldList.push(new FilterItem(key, data[key], "select", "", []));
    //     }
    //   }
    // }
    filterItem.fieldList = fieldList;
    return filterItem;
  }


  getOptionsList(value, arr) {
    let result: Array<any> = this.filterData;
    for (let i = 0; i < arr.length; i++) {
      let fieldItem = result.find(item => item.id == value);
      if (fieldItem) {
        result = fieldItem.permiss;
      }
    }
    return result;
  }
}
