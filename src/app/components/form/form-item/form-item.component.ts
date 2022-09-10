import { Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ComponentList } from 'src/mode/formItem';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit {

  @Input() formList: any[];

  @Output() formSubmit = new EventEmitter();

  form!: FormGroup;

  constructor(
  ) { }

  ngOnInit() {
    this.initForm();
  }

  /**
   * 初始化表单
   */
  initForm() {
    let obj = {};
    this.formList.forEach((item: any) => {
      obj[item.fieldName] = new FormControl('');
    });
    this.form = new FormGroup(obj);
  }

  /**
   * 表单提交
   */
  onSubmit() {
    if (this.form.valid) {
      console.log('submit', this.form.value);
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    this.formSubmit.emit("表单提交");
  }

}
