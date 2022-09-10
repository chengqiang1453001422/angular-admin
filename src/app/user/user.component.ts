import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FilterItem, SaveFilter } from 'src/mode/product';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  isVisibleMiddle: boolean = false;

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    //this.initFilterList(this.saveData);
    this.addFilter();
    console.log("生成的数据", this.filterCondtionList)

    console.log("filterList", this.filterList)

  }

  filterData = [
    {
      id: "user_behavior",
      name: "用户行为",
      permiss: [
        {
          id: "car_to_buy",
          name: "购买商品数量",
          valueType: "number",
          extra: true,
          operator: [">=", "=", "<"],
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
          operator: [">=", "=", "<"],
          opreatList: [
            { id: "=", name: "等于"},
            { id: "<", name: "小于"}
          ]
        }
      ]
    },
    {
      id: "user_property",
      name: "用户属性",
      permiss: [
        {
          id: "coutry",
          name: "国家",
          valueType: "number",
          extra: false,
          operator: [">=", "=", "<"],
          opreatList: [
            { id: "in", name: "在"},
            { id: "!in", name: "不在"},
          ]
        },
      ]
    },
    {
      id: "segment",
      name: "用户名单",
      permiss: [
        {
          id: "lessing",
          name: "名单列表",
          valueType: "select",
          extra: false,
          operator: [">=", "=", "<"],
          opreatList: [
            { id: "in", name: "包含"},
            { id: "!in", name: "不包含"},
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
        fieldName: "audienceFilter",
        fieldValue: "user_behavior",
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
            fieldName: "operator",
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
        fieldName: "audienceFilter",
        fieldValue: "user_property",
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
        audienceFilter: "user_behavior",
        code: "car_to_buy",
        operator: ">=",
        value: "78",
        timerFrame: {
          type: "this_mounth",
        }
      },
      {
        audienceFilter: "user_behavior",
        code: "car_to_buy",
        operator: ">=",
        value: "78",
        timerFrame: {
          type: "<",
          startDate: "2022-8-23"
        }
      }
    ],
    [
      {
        audienceFilter: "user_behavior",
        code: "seek_to",
        operator: "=",
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
    if (data.fieldName == "audienceFilter") {
      // audienceFilter
      let permiss = data.optionsList.find(item => item.id == data.fieldValue).permiss;
      let save = new SaveFilter(data.fieldValue, null, null, null, {type: null})
      data.fieldList = this.addFieldList(permiss, save);
    } else if (data.fieldName == "code") {
      // code
      arr.find(item => item.fieldName == "operator").optionsList = data.optionsList.find(item => item.id == data.fieldValue).opreatList;
    } else if (data.fieldName == "timerFrameType") {
      // 日期
      let index = arr.findIndex(item => item.fieldName == "timerFrameValue");
      if (this.confirmDate.includes(data.fieldValue)) {
        // 固定日期
        if (index !== -1) {
          arr.splice(index, 1);
          console.log("arr", arr)
        }
        data.fieldValueType = "confirmDate";
      } else if (this.rangedate.includes(data.fieldValue)) {
        // 区间日期
        if (index === -1) {
          arr.push(new FilterItem("timerFrameValue", [], "dateRange", "dateRange", []));
        } else {
          arr[index].fieldType = "dateRange";
        }
      } else {
        // 普通日期
        if (index === -1) {
          arr.push(new FilterItem("timerFrameValue", "", "date", "date", []));
        }
      }
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
    data = data || new SaveFilter("user_behavior", null, null, null, {type: null});
    let permiss = this.filterData.find(item => item.id == data.audienceFilter).permiss;

    // audienceFilter
    let filterItem = new FilterItem("audienceFilter", data.audienceFilter, "select", "", this.filterData);
    filterItem.fieldList = this.addFieldList(permiss, data);
    return filterItem;
  }

  addFieldList(permiss, data) {
    let fieldList = [];
    // code
    let codeItem = permiss.find(item => item.id == data.code) || permiss[0];
    if (data.audienceFilter == "segment") {
      fieldList.push(new FilterItem("code", data.code, "select", codeItem.valueType, permiss, true));
    } else {
      fieldList.push(new FilterItem("code", data.code, "select", codeItem.valueType, permiss));
    }

    // operator
    fieldList.push(new FilterItem("operator", data.operator, "select", "", codeItem.opreatList));

    // value
    let fieldValueType = "input";
    switch (codeItem.valueType) {
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
    let valueOptionsList = [];
    if (data.audienceFilter == "segment") {
      valueOptionsList = this.roasterList;
    }
    fieldList.push(new FilterItem("value", data.value, fieldValueType, "", valueOptionsList))

    // timerFrame
    if (codeItem.extra) {
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
    return fieldList;
  }

  roasterList = [
    {id: "1", name: "名单一"},
    {id: "2", name: "名单二"},
    {id: "3", name: "名单三"}
  ]

  createBasicMessage() {
    //this.isVisibleMiddle = true;
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzWrapClassName: "vertical-center-modal",
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  handleOkMiddle(): void {
    console.log('click ok');
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
}
