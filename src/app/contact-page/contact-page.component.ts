
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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


  constructor(private router:Router,public dialog: MatDialog) { }
  openDialog() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);
    setTimeout(() => {
      dialogRef.close();
    }, 3000);
  }

  onSubmit(value:string):void {
     if(this.name.valid  &&  this.phoneNumber.valid)
     this.dialog.open(DialogElementsExampleDialogcopy);

     else{ this.dialog.open(DialogElementsExampleDialog); }

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
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}

@Component({
  selector: 'dialog-elements-example-dialog copy',
  templateUrl: 'dialog-elements-example-dialog copy.html',
})
export class DialogElementsExampleDialogcopy {}
