
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductService } from '../product.service';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddressService } from '../address.service';
import { User } from '../user';
import { Address } from '../address';
import { CartService } from '../cart.service';
import { Order, OrderItem } from '../order'  ;
import { OrderService } from '../order.service';
import { CartItem } from '../cart';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: '[app-delivery-info]',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeliveryInfoComponent {
  @ViewChild('header') header!: ElementRef;
  @Output() searchEvent = new EventEmitter<string>();
  prevScrollpos = 0;
  hide = true;
  showLoginBox = false;
  showCartBox=false;
  showSearchBox=false;
  products:any;
  pay:number=0;
  errMessage:string=''
  IsCartProduct=false;
  order=new Order()
  tempOrder:any[]=[]
public fullname:string=''
public email:string=''
public phone:string=''
public address:string=''
public province:string=''
public district:string=''
public districts: string[] =['Chọn Quận/ Huyện'];
selectedProvince =null;
selectedDistrict =null;
public selectedOption:string=''
public selectedPrice: any = null;
public selectedPay='Thanh toán khi nhận hàng (COD)';
selectedAddress=new Address();

displayPage: any;
myAddresss:any[] = [];
account=new User();
defaultAddress=new Address()
cartProducts: any[]=[];
public cartItemCount = 0;
tempCartProduct: any[]=[]
tempCart:any[]=[]
allProduct:any[]=[]
  constructor(private formBuilder: FormBuilder,private router:Router,private productService:ProductService,public dialog: MatDialog, public addressService:AddressService,public cartService:CartService,private orderService:OrderService) {
    this.account=JSON.parse(sessionStorage.getItem('Account') || '{}')
    this.tempOrder= JSON.parse(localStorage.getItem('Order') || '{}');
    for (let i = 0; i < this.tempOrder.length; i++) {
      this.pay+=this.tempOrder[i].total
    }
    this.productService.getProducts().subscribe({
      next:(data)=>{this.allProduct=data},
      error:(err)=>{this.errMessage=err}
    })
    this.addressService.getAddress(this.account._id).subscribe({
      next: (data) => {
        this.myAddresss = data
        this.defaultAddress= data.find((p: { IsDefault: boolean; })=>p.IsDefault==true)
        this.selectedAddress=this.defaultAddress
      },
      error: (err) => { this.errMessage = err }
    });
    if (sessionStorage.getItem('checkLogin') === '1') {
      cartService.loadCartDB();
    }else{
      cartService.loadCart()
    }
    this.cartItemCount = cartService.cartAddProduct.length;
    this.cartProducts = cartService.cartAddProduct;
    cartService.getCartUpdatedListener().subscribe(() => {
      this.cartItemCount = cartService.cartAddProduct.length;
      this.cartProducts = cartService.cartAddProduct;

    });
    console.log(this.cartProducts);

    for (let i = 0; i < this.tempOrder.length; i++) {
      this.order.orderItems.push(new OrderItem(this.tempOrder[i]._id,this.tempOrder[i].quantity,this.tempOrder[i].Discount))
    }
    this.order.userId=this.account._id,
    this.order.cDate=new Date()
    const idsToRemove = this.tempOrder.map(order => order._id);
    this.tempCartProduct = this.cartProducts.filter(product => !idsToRemove.includes(product._id));
    // const accountcc=this.account
    // accountcc.cart=this.tempCartProduct
    // console.log(this.tempCartProduct);

    // console.log( accountcc);

  }

  selectAddress(address: Address) {
    this.selectedAddress=address
  }
activeContent = 'content1';
  showContent(content: string): void {
    this.activeContent = content;
  }


public ngOnInit(): void{
  if (this.selectedAddress.city == "Thành phố Hồ Chí Minh") {
      this.selectedOption = 'Giao hàng trong tỉnh'
      return;
    }
    else {
      this.selectedOption = 'Giao hàng ngoài tỉnh'
      return;
    }
}


//validate


public showText() {
  const messageElem = document.getElementById("message");
  const price = this.selectedPrice === 'Giao hàng trong tỉnh' ? '20000' : '40000';
  if (messageElem) {
    messageElem.innerHTML = this.selectedPrice;
  }
}

  public changePay(event: any){
    this.selectedPay = event.target.value;
  }
  showPay(event: any) {
    const messageElem = document.getElementById("message");
    if (messageElem) {
      if (event.target.value === "Thanh toán khi nhận hàng (COD)") {
        messageElem.innerHTML = "Thanh toán khi nhận hàng (COD)";
      } else if (event.target.value === "Chuyển khoản qua ngân hàng") {
        messageElem.innerHTML = "Chuyển khoản qua ngân hàng";
      }
      else if (event.target.value === "Ví điện tử") {
        messageElem.innerHTML = "Ví điện tử";
      }
    }
  }



  get totalShip(): number {
    if (this.selectedAddress.city === null) {
      return 0;
    }
   else if (this.selectedAddress.city === 'Thành phố Hồ Chí Minh') {
      return 20000;
    }
    else {
      return 40000;
    }
  }


  get tong(): number {
    return this.totalShip  + this.pay;
  }

  completeOrder(){
    this.order.total=this.tong
    this.order.addressID=this.selectedAddress._id
    console.log(this.order);
    this.orderService.postProduct(this.order).subscribe({
      next:(data)=>{
        this.order=data
        localStorage.removeItem('Order')
      },
      error:(err)=>{this.errMessage=err}
    })
    const idsToRemove = this.tempOrder.map(order => order._id);
    this.tempCartProduct = this.cartProducts.filter(product => !idsToRemove.includes(product._id));

    for (let i = 0; i < this.tempCartProduct.length; i++) {
      this.tempCart.push(new CartItem(this.tempCartProduct[i]._id, this.tempCartProduct[i].quantity));
    }
    // this.account.cart=this.tempCart
    this.cartService.updateCart(this.account._id,this.tempCart).subscribe({
      next:(data)=>{
        this.account=data,
        console.log(data);
      },
      error:(err)=>{this.errMessage=err}
    })
    sessionStorage.setItem("Account",JSON.stringify(this.account))
    this.cartService.createCartproduct(this.allProduct)

  }





}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {}
