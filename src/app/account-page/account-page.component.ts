import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MyErrorStateMatcher } from './MyErrorStateMatcher';

import {  FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../user';

import { DatePipe } from '@angular/common';
import { LocationService } from '../location.service';
import { Address } from '../address';
import { AddressService } from '../address.service';
import { AuthService } from '../auth.service';

/** @title Input with a custom ErrorStateMatcher */
@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AccountPageComponent implements OnInit {
  @ViewChild('nameInput') nameInput!: ElementRef;
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

  myDiscount=false

  showmodal=false;
  account=new User();


  registerForm: FormGroup;
  name:FormControl;
  email: FormControl;
  dob: FormControl;
  phoneNumber: FormControl;
  gender: FormControl;
  password: FormControl;
  otp:FormControl;
  allowFix:boolean=false


  myAddresss:any[] = [];

  errMesage: any;

  defaultAddress=new Address()
  constructor(private cdRef: ChangeDetectorRef,private _formBuilder: FormBuilder,public datePipe: DatePipe,private locationService: LocationService,private addressService:AddressService,private authService:AuthService) {
    this.cities=[]

    this.locationService.getCities().subscribe( {
      next:(data)=>{this.cities=data},
      error:(err)=>(this.errMesage=err)

    });

    this.account=JSON.parse(sessionStorage.getItem('Account') || '{}')
    // this.acc = new FormControl(this.account.username, [Validators.required]);
    // this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.name = new FormControl(this.account.name, Validators.required);
    this.email = new FormControl(this.account.email);
    this.dob = new FormControl(this.account.dob, Validators.required);
    this.phoneNumber = new FormControl(this.account.phoneNumber, [
      Validators.required,
      Validators.pattern(/^(03|05|08|09)\d{8}$/),
    ]);
    this.gender = new FormControl(this.account.gender, Validators.required);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.otp = new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]);
    this.registerForm = this._formBuilder.group({
      name: this.name,
      email: this.email,
      dob: this.dob,
      phoneNumber: this.phoneNumber,
      gender:this.gender
    });
    this.addressService.getAddress(this.account._id).subscribe({
      next: (data) => {
        this.myAddresss = data
        this.defaultAddress= data.find((p: { IsDefault: boolean; })=>p.IsDefault==true)
        console.log(this.defaultAddress._id);

      },
      error: (err) => { this.errMesage = err; }
    });
  }
  formAddress!:FormGroup


  fixProfile(){
    this.allowFix=!this.allowFix
    if (this.allowFix) {
      setTimeout(() => {
        this.nameInput.nativeElement.focus();
      });
    }
  }

  getUserFromForm(): User {
    return new User(
      this.account._id,
      this.account.username,
      this.account.password,
      this.name.value,
      this.email.value,
      this.dob.value,
      this.phoneNumber.value,
      this.gender.value,
      this.account.Img,
      this.account.cDate,
      this.account.cart,
      this.account.order,
      this.account.discount,
      this.account.Address,
    );
  }
  onSubmit() {
    const user = this.getUserFromForm();
    console.log(user);
    this.allowFix=!this.allowFix
    this.authService.updateUser(user).subscribe({
      next:(data)=>{
        this.account=data,
        sessionStorage.setItem('Account', JSON.stringify(this.account))
      },
      error:(err)=>{this.errMesage=err}
    })
    console.log(this.account);


  }




  showMy(myProfile:boolean,myOrder:boolean,myNotification:boolean,myDiscount:boolean){
    this.myProfile =myProfile;
    this.myOrder=myOrder;
    this.myNotification=myNotification;
    this.myDiscount=myDiscount
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
  //email
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  labelPosition: 'before' | 'after' = 'after';
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  thirdFormGroup: FormGroup = this._formBuilder.group({thirdCtrl: ['']});
  fourFormGroup: FormGroup = this._formBuilder.group({fourCtrl: ['']});
  hide = true;
  //selected date
  selectedDate: Date | undefined;
  defaultDate: Date | undefined;







  ngOnInit() {
    this.formAddress = new FormGroup({
      hovaten: new FormControl(''),
      phonenumber: new FormControl(''),
      city: new FormControl(''),
      district: new FormControl(''),
      ward: new FormControl(''),
      diachicuthe: new FormControl(''),
      addressType: new FormControl(''),
      IsDefault: new FormControl(true)
    });
    // this.myAddresss = JSON.parse(localStorage.getItem('Address') || '{}');
  }
  getErrorNameMessage() {
    if (this.name.hasError('required')) {
      return '*Vui lòng nhập họ và tên';
    }

    return this.name.hasError('name') ? 'Họ và tên không hợp lệ' : '';
  }
  getErrorPhoneMessage() {
    if (this.phoneNumber.hasError('required')) {
      return '*Vui lòng nhập số điện thoại';
    }

    return this.phoneNumber.hasError('pattern') ? '*Số điện thoại không hợp lệ' : '';
  }
  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Bạn phải nhập email';
    }
    return this.email.hasError('email') ? 'Email không hợp lệ' : '';
  }

  getErrorDoBMessage() {
    if (this.dob.hasError('required')) {
      return '*Vui lòng nhập ngày sinh';
    }

    return this.dob.hasError('dob') ? 'Ngày sinh không hợp lệ' : '';
  }
  getErrorPWMessage() {
    if (this.password.hasError('required')) {
      return '*Vui lòng nhập mật khẩu';
    }

    return this.password.hasError('password') ? 'Mật khẩu không hợp lệ' : '';
  }
  getErrorOTPMessage(){
    if (this.otp.hasError('required')) {
      return '*Vui lòng nhập OTP';
    }

    return this.otp.hasError('otp') ? 'Mật khẩu không hợp lệ' : '';

  }


  cities: any[] = [];
  selectedCityName: string = '';
  districts: any[] = [];
  selectedDistrictName: string = '';
  Wards: any[] = [];
  selectedWardName: string = '';

  onCityChange(): void {
    console.log(this.selectedCityName);

    this.districts = [];
    this.selectedDistrictName = '';
    this.Wards=[];
    this.selectedWardName='';

    const selectedCity = this.cities.find(city => city.Name === this.selectedCityName);

    if (selectedCity) {
      this.districts = selectedCity.Districts;
    }

  }
  onDistrictChange():void{
    this.Wards=[];
    this.selectedWardName='';

    const selectedDistrict = this.districts.find(district=>district.Name === this.selectedDistrictName);

    if(selectedDistrict){
      this.Wards=selectedDistrict.Wards;
    }
  }
  addressSubmit(){
    console.log(this.formAddress.value);
    this.addressService.addAddressToUser(this.account._id,this.formAddress.value).subscribe({
      next:(data)=>{this.myAddresss=data},
      error:(err)=>{this.errMesage=err}
    })
    this.cdRef.detectChanges();
  }
  deleteA(_id:string){
    this.addressService.deleteAddress(this.account._id,_id).subscribe({
      next:(data)=>{this.myAddresss=data},
      error:(err)=>{this.errMesage=err}
    })
    this.cdRef.detectChanges();
  }

  setDefault(addressId:string){
    this.addressService.updateAddressDefault(this.account._id,addressId).subscribe({
      next:(data)=>{
        this.myAddresss=data;
        this.defaultAddress= data.find((p: { IsDefault: boolean; })=>p.IsDefault==true)
        this.cdRef.markForCheck();
        },
      error:(err)=>{
        this.errMesage=err
      }
    })
  }

}
