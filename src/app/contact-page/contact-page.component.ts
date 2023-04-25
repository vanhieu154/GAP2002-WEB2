
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

  isPhoneNumberValid(phoneNumber: string): boolean {
    if (phoneNumber.length !== 10) {
      return false;
    }

    const phoneNumberRegex = /^(03|05|08|09)\d{8}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      return false;
    }
    return true;
  }
  updatePhoneNumber(): void {
    if (this.isPhoneNumberValid(this.phone)) {
      this.phoneNumberCheckResult = true;
    } else {
      this.phoneNumberCheckResult = false;
    }
  }


FormControl = new FormControl('', [Validators.required, Validators.email]);
matcher = new MyErrorStateMatcher();

}
