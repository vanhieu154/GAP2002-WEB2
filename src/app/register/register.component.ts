import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  hide = true;

  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(\d{10})$/),
  ]);
  getErrorPhoneMessage() {
    if (this.phoneNumber.hasError('required')) {
      return '*Vui lòng nhập số điện thoại';
    }

    return this.phoneNumber.hasError('phone') ? 'Số điện thoại không hợp lệ' : '';
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return '*Vui lòng nhập email';
    }

    return this.email.hasError('email') ? '*Email không hợp lệ' : '';
  }
}
