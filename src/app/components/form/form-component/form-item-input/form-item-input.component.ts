import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-item-input',
  templateUrl: './form-item-input.component.html',
  styleUrls: ['./form-item-input.component.scss']
})
export class FormItemInputComponent implements OnInit {

  @Input() form!: FormGroup;
  @Input() field!: any;
  constructor() { }

  ngOnInit() {

  }


}
