import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.userFormGroup = this.fb.group({
      username: [""],
      password: [""],
      confirmPassword: [""],
      address: this.fb.group({
        street: [""],
        city: [""],
        state: [""],
        zip: [""],
      })
    })
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
