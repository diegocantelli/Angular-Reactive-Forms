import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  userFormGroup: FormGroup;
  stateOptions: string[] = ["PA", "OH", "MI"]

  constructor() { }

  ngOnInit() {
    this.userFormGroup = new FormGroup({
      username: new FormControl(""),
      password: new FormControl(""),
      confirmPassword: new FormControl(""),
      address: new FormGroup({
        street: new FormControl(""),
        city: new FormControl(""),
        state: new FormControl(""),
        zip: new FormControl(""),
      })
    })
  }

  clear(){
    this.userFormGroup.reset();
  }

  save(){
    console.log(this.userFormGroup.value);
  }

}
