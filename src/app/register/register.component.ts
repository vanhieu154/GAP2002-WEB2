import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  hide = true;
  registerForm: FormGroup;
  acc: FormControl;
  name:FormControl;
  password: FormControl;
    // firstName: FormControl;
  // lastName: FormControl;
  email: FormControl;
  dob: FormControl;
  phoneNumber: FormControl;
  gender: FormControl;

  users: User[] = [];
  constructor(private formBuilder: FormBuilder,private authService: AuthService) {
    this.acc = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.name = new FormControl('', Validators.required);
    // this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('');
    this.dob = new FormControl('', Validators.required);
    this.phoneNumber = new FormControl('', [
      Validators.required,
      Validators.pattern(/^(03|05|08|09)\d{8}$/),
    ]);
    this.gender = new FormControl('', Validators.required);

    this.registerForm = this.formBuilder.group({
      acc: this.acc,
      password: this.password,
      // firstName: this.firstName,
      // lastName: this.lastName,
      name: this.name,
      email: this.email,
      dob: this.dob,
      phoneNumber: this.phoneNumber,
      gender:this.gender,
    });
   }
  ngOnInit() {

  }
  // name = new FormControl('', [Validators.required]);
  getErrorNameMessage() {
    if (this.name.hasError('required')) {
      return '*Vui lòng nhập họ và tên';
    }

    return this.name.hasError('name') ? 'Họ và tên không hợp lệ' : '';
  }

  // acc = new FormControl('', [Validators.required]);
  getErrorAccMessage() {
    if (this.acc.hasError('required')) {
      return '*Vui lòng nhập tên đăng nhập';
    }

    return this.acc.hasError('acc') ? 'Tên đăng nhập không hợp lệ' : '';
  }

  // password = new FormControl('', [Validators.required]);
  getErrorPWMessage() {
    if (this.password.hasError('required')) {
      return '*Vui lòng nhập mật khẩu';
    }

    return this.password.hasError('password') ? 'Mật khẩu không hợp lệ' : '';
  }

  // dob = new FormControl('', [Validators.required]);
  getErrorDoBMessage() {
    if (this.dob.hasError('required')) {
      return '*Vui lòng nhập ngày sinh';
    }

    return this.dob.hasError('dob') ? 'Ngày sinh không hợp lệ' : '';
  }

  // phoneNumber = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern(/^(03|05|08|09)\d{8}$/),
  // ]);
  getErrorPhoneMessage() {
    if (this.phoneNumber.hasError('required')) {
      return '*Vui lòng nhập số điện thoại';
    }

    return this.phoneNumber.hasError('pattern') ? '*Số điện thoại không hợp lệ' : '';
  }
  // email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Bạn phải nhập email';
    }
    return this.email.hasError('email') ? 'Email không hợp lệ' : '';
  }
  getUserFromForm(): User {
    return new User(
      null,
      this.acc.value,
      this.password.value,
      this.name.value,
      this.email.value,
      this.dob.value,
      this.phoneNumber.value,
      this.gender.value,
      '',
      new Date(),
      [],
      [],
      []
    );
  }
  onSubmit() {
    const user = this.getUserFromForm();
      console.log(user);
    this.authService.addUser(user).subscribe({
      next:(data)=>{console.log(data);
      },
      error:(err)=>{console.log(err);
      }
    });
    // console.log(this.registerForm.value);
  }
}
