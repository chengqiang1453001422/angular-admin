export class Product {
  public id: number;
  public name: string;
  public describe: string;
  public createTime: string;

  constructor(
    id: number,
    name: string,
    describe: string,
    createTime: string
  ) {
    this.id = id;
    this.name = name;
    this.describe = describe;
    this.createTime = createTime;
  }

}

export class FilterItem {
  public fieldName: string;
  public fieldValue: string | Array<any>;
  public fieldType: string;
  public fieldValueType: string;
  public optionsList: Array<any>;
  public fieldList: Array<any> = [];
  public fieldHide: boolean = false;
  public fieldLevel: number = 1;

  constructor(
    fieldName: string,
    fieldValue: string | Array<any>,
    fieldType: string,
    fieldValueType: string,
    optionsList: Array<any>,
    fieldHide?: boolean
  ) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.fieldType = fieldType;
    this.fieldValueType = fieldValueType;
    this.optionsList = optionsList;
    this.fieldHide = fieldHide;
  }
}

export interface TimerFrame {
  type: string;
  startDate?: string;
  endDate?: string;
}

export class SaveFilter {
  public audienceFilter: string;
  public code: string;
  public opreat: string;
  public value: string;
  public timerFrame: TimerFrame;

  constructor(
    audienceFilter: string,
    code: string,
    opreat: string,
    value: string,
    timerFrame: TimerFrame
  ) {
    this.audienceFilter = audienceFilter;
    this.code = code;
    this.opreat = opreat;
    this.value = value;
    this.timerFrame = timerFrame;
  }
}

export class UserInfo {
  name: string;
  age: number = 13; //类的默认属性值

  constructor(name?) {
    this.name = name || "哈哈";
  }
}
