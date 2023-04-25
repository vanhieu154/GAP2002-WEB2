
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ContactPageComponent {
  phoneNumberCheckResult: boolean | null = null;
  public phone:string='';
  public fullname:string='';
  public email:string='';
  public contentcontact:string='';

  onSubmit(value:string)
    {
     if(this.fullname == ''   &&  this.phoneNumberCheckResult ===false)
     {alert("Bạn chưa nhập đủ hoặc chưa đúng thông tin")}
     else
     {alert("Cảm ơn " + value + ", thông tin của bạn đã được gửi !" )}
    }

    name = new FormControl('', [Validators.required]);
    getErrorNameMessage() {
      if (this.name.hasError('required')) {
        return '*Vui lòng nhập họ và tên';
      }

      return this.name.hasError('name') ? 'Họ và tên không hợp lệ' : '';
    }
    phoneNumber = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(03|05|08|09)\d{8}$/),
  ]);
  getErrorPhoneMessage() {
    if (this.phoneNumber.hasError('required')) {
      return '*Vui lòng nhập số điện thoại';
    }

    return this.phoneNumber.hasError('pattern') ? '*Số điện thoại không hợp lệ' : '';
  }


FormControl = new FormControl('', [Validators.required, Validators.email]);
matcher = new MyErrorStateMatcher();

}
