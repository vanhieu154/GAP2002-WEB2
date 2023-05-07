import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { MyErrorStateMatcher } from './MyErrorStateMatcher';

import {  FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../user';

import { DatePipe } from '@angular/common';
import { LocationService } from '../location.service';
import { Address } from '../address';
import { AddressService } from '../address.service';
import { AuthService } from '../auth.service';
import { MatStepper } from '@angular/material/stepper';
import { OrderService } from '../order.service';
import { Order, OrderDetail, OrderAddress } from '../order';
import { Product } from '../product';
import { ProductService } from '../product.service';

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
  myOrderDetail=true;



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

  order:any[]=[]
  waitConfirmOrder:any[]=[];
  waitPickUp:any[]=[]
  inDelivering:any[]=[]
  delivered:any[]=[]
  cancelled:any[]=[]

  waitConfirmOrderDetails: any[] = [];
  waitPickUpDetails:any[]=[]
  inDeliveringDetails:any[]=[]
  deliveredDetails:any[]=[]
  cancelledDetails:any[]=[]

  waitConfirmOrderAddress:any[]=[];
  waitPickUpAddress:any[]=[]
  inDeliveringAddress:any[]=[]
  deliveredAddress:any[]=[]
  cancelledAddress:any[]=[]

  waitConfirmOrderlength:number=0;
  waitPickUplength:number=0
  inDeliveringlength:number=0
  deliveredlength:number=0
  cancelledlength:number=0
  constructor(private el: ElementRef,private cdRef: ChangeDetectorRef,private _formBuilder: FormBuilder,public datePipe: DatePipe,private locationService: LocationService,private addressService:AddressService,private authService:AuthService, private orderService:OrderService,private pService:ProductService) {
    this.cities=[]
    this.account=JSON.parse(sessionStorage.getItem('Account') || '{}')
    // this.getOrderDetails()
    this.orderService.getOrders(this.account._id).subscribe({
      next:(data)=>{
        this.order=data

        this.getOrderDetailsForStatus(this.order,this.waitConfirmOrder,this.waitConfirmOrderDetails,this.waitConfirmOrderAddress,0)
         this.waitConfirmOrderlength=this.waitConfirmOrder.length
        this.getOrderDetailsForStatus(this.order,this.waitPickUp,this.waitPickUpDetails,this. waitPickUpAddress,1)
          this.waitPickUplength=this.waitPickUp.length+this.waitConfirmOrderlength
        this.getOrderDetailsForStatus(this.order,this.inDelivering,this.inDeliveringDetails,this.inDeliveringAddress,2)
          this.inDeliveringlength=this.inDelivering.length+this.waitPickUplength
        this.getOrderDetailsForStatus(this.order,this.delivered,this.deliveredDetails,this.deliveredAddress,3)
          this.deliveredlength=this.delivered.length+this.inDeliveringlength
        this.getOrderDetailsForStatus(this.order,this.cancelled,this.cancelledDetails,this.cancelledAddress,4)

        console.log(this.waitConfirmOrderDetails);

        console.log(this.waitConfirmOrderlength);
        console.log(this.cancelledDetails);


        // this.cancelledlength=this.cancelled.length+this.deliveredlength
      },
      error:(err)=>{this.errMesage=err}
    })

    this.locationService.getCities().subscribe( {
      next:(data)=>{this.cities=data},
      error:(err)=>(this.errMesage=err)
    });
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
      },
      error: (err) => { this.errMesage = err; }
    });
  }
  formAddress!:FormGroup
  getOrderDetailsForStatus(orders: Order[],conditionOrder:any[], detailsArray: any[], addressArray: any[], status: number) {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].status === status) {
        conditionOrder.push(orders[i])
        this.orderService.getOrderDetail(orders[i]._id).subscribe({
          next: (data) => {
            detailsArray.push([]);
            detailsArray[i]=data;
          },
          error: (err) => {
            this.errMesage = err;
          },
        });
        this.orderService.getOrderAddress(orders[i]._id).subscribe({
          next: (data) => {
            addressArray.push([]);
            addressArray[i]=data;
          },
          error: (err) => {
            this.errMesage = err;
          },
        })
      }
    }
  }
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
  showModal(){
    this.showmodal=true
  }
  hideModal(){
    this.showmodal=false
    this.isFormInvalid=false
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




  ngOnInit() {
    this.formAddress = this._formBuilder.group({
      hovaten: ['', Validators.required],
      phonenumber: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      ward: ['', Validators.required],
      diachicuthe: ['', Validators.required],
      addressType: ['', Validators.required],
      IsDefault: [true]
    });
    // this.myAddresss = JSON.parse(localStorage.getItem('Address') || '{}');
    this.secondFormGroup.valueChanges.subscribe((_value)=>{
      this.secondFormGroup.setErrors({'secondCtrl':true})
    })


  }

  getErrorNameMessage() {
    if (this.name.hasError('required')||this.formAddress.controls['hovaten'].hasError('required')) {
      return '*Vui lòng nhập họ và tên';
    }

    return this.name.hasError('name') ? 'Họ và tên không hợp lệ' : '';
  }
  getErrorPhoneMessage() {
    if (this.phoneNumber.hasError('required')||this.formAddress.controls['phonenumber'].hasError('required')) {
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




  cities: any[] = [];
  districts: any[] = [];
  Wards: any[] = [];
  onCityChange(): void {
    this.districts = [];
    this.Wards=[];
    const selectedCity = this.cities.find(city => city.Name == this.formAddress.controls['city'].value);

    if (selectedCity) {
      this.districts = selectedCity.Districts;
    }


  }
  onDistrictChange():void{
    this.Wards=[];
    const selectedDistrict = this.districts.find(district=>district.Name == this.formAddress.controls['district'].value);
    if(selectedDistrict){
      this.Wards=selectedDistrict.Wards;
    }
  }
  isFormInvalid = false;
  addressSubmit(){
    if (this.formAddress.valid) {
      console.log(this.formAddress.value);
      this.addressService.addAddressToUser(this.account._id,this.formAddress.value).subscribe({
        next:(data)=>{this.myAddresss=data},
        error:(err)=>{this.errMesage=err}
      })
      this.cdRef.detectChanges();
      this.hideModal()
    } else {
      this.isFormInvalid = true;
    }

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



  logOldPasswword :boolean=false
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['', (Validators.required, Validators.minLength(6))]});
  thirdFormGroup: FormGroup = this._formBuilder.group({thirdCtrl: ['', (Validators.required, Validators.minLength(6))]});
  fourFormGroup: FormGroup = this._formBuilder.group({fourCtrl: ['', (Validators.required, Validators.minLength(9))]});
  hide = true;
  hide1 = true;
  hide2 = true;
  @ViewChild("stepper", { static: false }) stepper!: MatStepper;
  checkOldPass(){
    if(this.firstFormGroup.invalid){
      this.logOldPasswword=true
    }else{
      console.log(this.firstFormGroup.controls['firstCtrl'].value);

      this.authService.confirmPass(this.account._id,this.firstFormGroup.controls['firstCtrl'].value).subscribe({
        next:(data)=>{
          if(data==true){
            this.stepper.next();
          }else{
            this.logOldPasswword=true
          }
        },
        error:(err)=>{this.errMesage=err}
      })
    }
  }
  checkNewPassRes:string=''
  checkNewPassStatus:boolean=true
  checkNewPassValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve, _reject) => {
      if (control.value == '') {
        resolve({ emptyPassword: true }); // Giá trị rỗng
      } else if (control.value == this.firstFormGroup.controls['firstCtrl'].value) {
        resolve({ invalidPassword: true }); // Giá trị không hợp lệ
      } else {
        resolve(null); // Giá trị hợp lệ
      }
    });
  }
  // secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['', (Validators.required, Validators.minLength(6))]});
  secondFormGroup: FormGroup = this._formBuilder.group({
    secondCtrl: ['', [Validators.required, this.checkNewPassValidator.bind(this),Validators.minLength(6)]],
  });
  checkNewPass(){
    if(this.secondFormGroup.valid){
      this.stepper.next();
    }else{
      if(this.secondFormGroup.controls['secondCtrl'].value==''){
        this.checkNewPassRes='*Vui lòng nhập mật khẩu mới'
      }else{
        if(this.secondFormGroup.controls['secondCtrl'].value==this.firstFormGroup.controls['firstCtrl'].value){

          this.checkNewPassRes='Mật khẩu mới không được trùng lắp với mật khẩu gần nhất'
        }else{
        this.checkNewPassRes='*Mật khẩu không hợp lệ, yêu cầu tối thiểu 6 ký tự'
        }
      }
    }
  }
  checkReNewPassRes:string=''
  checkReNewPass(){
    this.checkReNewPassRes=""
    if(this.secondFormGroup.controls['secondCtrl'].value==this.thirdFormGroup.controls['thirdCtrl'].value){
      this.stepper.next();
    }else{
      this.checkReNewPassRes="Mật khẩu không trùng khớp"
    }
  }
  checkOTPRes:string=''
  checkOTP(){
    if(this.fourFormGroup.controls['fourCtrl'].value==123456789){
      this.authService.changePass(this.account._id,this.secondFormGroup.controls['secondCtrl'].value).subscribe({
        next:(data)=>{
          this.account=data
          sessionStorage.setItem('Account',JSON.stringify(data))
        },
        error:(err)=>{this.errMesage=err}
      })
      this.stepper.next();
    }else{
      if(this.fourFormGroup.controls['fourCtrl'].value==''){
        this.checkOTPRes='*Vui lòng nhập mã OTP'
      }else{
        this.checkOTPRes='*Mã OTP sai yêu cầu nhập lại'
      }
    }
  }
  getErrorPWMessage() {
    if (this.secondFormGroup.hasError('required')) {
      return '*Vui lòng nhập mật khẩu';
    }else{
      return this.secondFormGroup.hasError('password') ?  'Mật khẩu không hợp lệ':'' ;
    }
  }


  updateOrder(order:any){
    order.status=4
    this.orderService.updateOrder(order).subscribe({
      next:(data)=>{
        // this.order = data.find((o: any) => o.userId === order.userId);
        //  this.getOrderDetails()},
      },
      error:(err)=>{this.errMesage=err}
    })
  }

  selectedRating:string='';
  comment:string='';
  productEvaluate=new Product();

  showEvaluate(o:any){
    this.productEvaluate=o
  }

  sendEvaluate(){
    const reviewData = {
      productId: this.productEvaluate._id,
      cusName:this.account.name,
      rating: this.selectedRating,
      comment: this.comment
    };


    this.pService.postEvaluate(reviewData).subscribe({
      next:(data)=>{console.log(data);
      },
      error:(err)=>{this.errMesage=err}

    })
  }





}

