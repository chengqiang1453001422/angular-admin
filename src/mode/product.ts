/*
 * @Author: 成强 
 * @Date: 2022-08-20 14:55:35
 * @LastEditors: 成强 
 * @LastEditTime: 2022-08-27 23:23:58
 * @FilePath: /angular-admin/src/mode/product.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

  constructor(
    fieldName: string,
    fieldValue: string | Array<any>,
    fieldType: string,
    fieldValueType: string,
    optionsList: Array<any>,
  ) {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    this.fieldType = fieldType;
    this.fieldValueType = fieldValueType;
    this.optionsList = optionsList;
  }
}