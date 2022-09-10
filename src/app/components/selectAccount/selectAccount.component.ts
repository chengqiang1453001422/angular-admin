import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-selectAccount',
  templateUrl: './selectAccount.component.html',
  styleUrls: ['./selectAccount.component.css']
})
export class SelectAccountComponent implements OnInit {

  myGroup = new FormGroup({
    name: new FormControl()
  })

  constructor() { }

  ngOnInit() {
  }

}
