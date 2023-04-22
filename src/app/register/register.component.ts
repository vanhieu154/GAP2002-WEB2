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
  name = new FormControl('', [Validators.required]);
  getErrorNameMessage() {
    if (this.name.hasError('required')) {
      return '*Vui lòng nhập họ và tên';
    }

    return this.name.hasError('name') ? 'Họ và tên không hợp lệ' : '';
  }

  acc = new FormControl('', [Validators.required]);
  getErrorAccMessage() {
    if (this.acc.hasError('required')) {
      return '*Vui lòng nhập tên đăng nhập';
    }

    return this.acc.hasError('acc') ? 'Tên đăng nhập không hợp lệ' : '';
  }

  password = new FormControl('', [Validators.required]);
  getErrorPWMessage() {
    if (this.password.hasError('required')) {
      return '*Vui lòng nhập mật khẩu';
    }

    return this.password.hasError('acc') ? 'Mật khẩu không hợp lệ' : '';
  }

  dob = new FormControl('', [Validators.required]);
  getErrorDoBMessage() {
    if (this.dob.hasError('required')) {
      return '*Vui lòng nhập ngày sinh';
    }

    return this.dob.hasError('acc') ? 'Ngày sinh không hợp lệ' : '';
  }

  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.pattern(/^0\d{9}$/),
  ]);
  getErrorPhoneMessage() {
    if (this.phoneNumber.hasError('required')) {
      return '*Vui lòng nhập số điện thoại';
    }

    return this.phoneNumber.hasError('pattern') ? '*Số điện thoại không hợp lệ' : '';
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return '*Vui lòng nhập email';
    }

    return this.email.hasError('email') ? '*Email không hợp lệ' : '';
  }
}
