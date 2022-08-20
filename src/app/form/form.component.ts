import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Product } from 'src/mode/product';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  generateClass = {
    saveable: true,
    saveableActive: false,
  }

  //FormControl 单个表单控件模型
  //管理单体表单控件的值和有效性状态
  name = new FormControl('');

  //FormGroup 多个表单控件组模型
  //管理一组 AbstractControl 实例的值和有效性状态
  profileForm0 = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });

  //formBuild 生成表单控件
  //FormBuilder 服务有三个方法：control()、group() 和 array()。这些方法都是工厂方法，用于在组件类中分别生成 FormControl、FormGroup 和 FormArray。
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    aliases: this.fb.array([
      this.fb.control('')
    ])
  });

  //FormArray 动态表单
  //管理一些 AbstractControl 实例数组的值和有效性状态。
  ngOnInit() {
    const obj = new Product(1,"2","3","4");
    console.log("obj===>", obj)
  }

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  updateName() {
    this.name.setValue(Math.random());
  }

  updateProfile() {
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street'
      }
    });
  }

  onSubmit() {
    console.log(this.profileForm.get("firstName"))
    console.log(this.profileForm.value)
  }

}
