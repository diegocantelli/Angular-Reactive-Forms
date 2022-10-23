import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidationService } from '../services/custom-validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  userFormGroup: FormGroup;
  stateOptions: string[] = ["PA", "OH", "MI"];

  userAddressInfo: any = {
    street: 'rua teste',
    city: 'Cidade teste',
    state: this.stateOptions[0],
    zip: "07055040"
  }

  constructor(
    private fb: FormBuilder,
    private customValidator: CustomValidationService) { }

  ngOnInit() {
    this.userFormGroup = this.fb.group({
      username: ["", Validators.required, this.customValidator.validateUsernameNotTaken.bind(this.customValidator)],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      address: this.fb.group({
        street: [""],
        city: [""],
        state: [""],
        zip: [""],
      }),
      daysAvailable: this.fb.array([this.fb.control("")])
    },{
      validators: this.customValidator.passwordMatchValidator("password", "confirmPassword")
    })
  }

  addDays(){
    this.daysAvailable.push(this.fb.control(""))
  }

  get daysAvailable(){
    return this.userFormGroup.get("daysAvailable") as FormArray
  }

  clear(){
    this.userFormGroup.reset();
  }

  save(){
    console.log(this.userFormGroup.value);
  }

  autoFillAddress(){
    this.userFormGroup.patchValue({
      // Essa é a propriedade que se deseja atualizar no formulário
      address: {
        street: this.userAddressInfo.street,
        city: this.userAddressInfo.city,
        state: this.userAddressInfo.state,
        zip: this.userAddressInfo.zip
      }
    })
  }

}
