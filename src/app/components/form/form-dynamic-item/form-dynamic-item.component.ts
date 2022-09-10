import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ComponentList } from 'src/mode/formItem';
import { SelectAccountComponent } from '../../selectAccount/selectAccount.component';
import { FormItemInputComponent } from '../form-component/form-item-input/form-item-input.component';

@Component({
  selector: 'app-form-dynamic-item',
  templateUrl: './form-dynamic-item.component.html',
  styleUrls: ['./form-dynamic-item.component.scss']
})
export class FormDynamicItemComponent implements OnInit {
  @Input() formItem: any;
  @Input() form!: FormGroup;
  @ViewChild("formField", { read: ViewContainerRef }) formField: ViewContainerRef;
  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    console.log('formItem', this.formItem, this.formField)
    this.createFormItem();
  }

  createFormItem() {
    let factory = this.resolver.resolveComponentFactory<FormItemInputComponent>(ComponentList[this.formItem.fieldType]);
    let comInstance = this.formField.createComponent<FormItemInputComponent>(factory);
    comInstance.instance.form = this.form;
    comInstance.instance.field = this.formItem;
  }

}
