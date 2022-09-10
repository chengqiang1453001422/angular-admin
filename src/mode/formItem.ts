import { FormItemInputComponent } from "src/app/components/form/form-component/form-item-input/form-item-input.component";

export class FieldItem {
  fieldName: string;
  fieldLabel: string;
  fieldValue: string | number;
  fieldId: number;
  fieldType: string;
  fieldLength: number;
  fieldRule: Array<any>;
  fieldPlacehold: string;
}

export const fieldList = [
  {
    fieldName: "name",
    fieldLabel: "姓名",
    fieldValue: "",
    fieldId: 1,
    fieldType: "input",
    fieldLength: 12,
    fieldRule: [
      {
        require: true,
        message: "请输入"
      }
    ],
    fieldPlacehold: "请输入"
  },
  {
    fieldName: "phone",
    fieldLabel: "手机号",
    fieldValue: "",
    fieldId: 1,
    fieldType: "input",
    fieldLength: 12,
    fieldRule: [
      {
        require: true,
        message: "请输入"
      }
    ],
    fieldPlacehold: "请输入"
  }
]

export const ComponentList = {
  input: FormItemInputComponent
}