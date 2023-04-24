<<<<<<< Updated upstream
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../delivery-info/delivery-info.component';
import { Observable } from 'rxjs';

=======
import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
>>>>>>> Stashed changes


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AccountPageComponent {
  myProfile=true;
  myAddress=false;
  changePass=false;
  myProfileP=true;

  myOrder=false;
  myOrderDetail=false;

  waitConfirmOrder=true;
  waitPickUp=false
  inDelivering=false
  delivered=false
  cancelled=false

  myNotification=false;

  showmodal=false;
  showMy(myProfile:boolean,myOrder:boolean,myNotification:boolean){
    this.myProfile =myProfile;
    this.myOrder=myOrder;
    this.myNotification=myNotification;
  }
  showMyAccount(myProfileP:boolean,myAddress:boolean,changePass:boolean){
    this.myAddress=myAddress;
    this.changePass=changePass;
    this.myProfileP=myProfileP;
  }
  showOrderStatus( waitConfirmOrder:boolean,waitPickUp:boolean,inDelivering:boolean,delivered:boolean,cancelled:boolean){
    this.waitConfirmOrder=waitConfirmOrder;
    this.waitPickUp=waitPickUp;
    this.inDelivering=inDelivering;
    this.delivered=delivered;
    this.cancelled=cancelled;
  }
  showModal(){
    this.showmodal=true
  }
  hideModal(){
    this.showmodal=false
  }
<<<<<<< Updated upstream
  //email
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  labelPosition: 'before' | 'after' = 'after';
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  constructor(private _formBuilder: FormBuilder) {}
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  thirdFormGroup: FormGroup = this._formBuilder.group({thirdCtrl: ['']});
  hide = true;
  // nhận xét
 
=======
  // email
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
>>>>>>> Stashed changes
}
