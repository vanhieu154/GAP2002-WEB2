import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavService } from '../nav.service';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit  {
  @ViewChild('header') header!: ElementRef;
  @Output() searchEvent = new EventEmitter<string>();
  prevScrollpos = 0;
  hide = true;
  showLoginBox = false;
  showCartBox=false;
  showSearchBox=false;
  cartProduct=false;
  products:any;
  pay:number=0;
  username = '';
  password = '';
  message = '';
  user:any;
  errMessage:string='';
  public cartItemCount = 0;
  hidden = false;
  constructor(private cartService: CartService,private renderer: Renderer2, private elementRef: ElementRef,public authService: AuthService,private router:Router,private navService: NavService,private productService:ProductService)  {
    if (sessionStorage.getItem('checkLogin') === '1') {
      authService.isLoggedIn=true
    }
  }
  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem("Cart")!);
    this.cartItemCount = this.cartService.cartProducts.length;
    this.cartService.getCartUpdatedListener().subscribe(() => {
      this.cartItemCount = this.cartService.cartProducts.length;
      if(this.cartItemCount==0){
        this.hidden=true
      }else{
        this.hidden=false
      }
    });
    if(this.cartItemCount==0){
      this.hidden=true
    }else{
      this.hidden=false
    }

  }
  showBox(showCartBox: boolean, showLoginBox: boolean,showSearchBox:boolean): void {
    if(this.showCartBox != showCartBox || this.showLoginBox != showLoginBox || this.showSearchBox!=showSearchBox){
      this.showCartBox = showCartBox;
      this.showLoginBox = showLoginBox;
      this.showSearchBox= showSearchBox;
    }
    else{
      this.hideBox()
    }
  }
  hideBox(): void {
    this.showLoginBox = false;
    this.showCartBox = false;
    this.showSearchBox =false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.hideBox();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScrollPos = window.pageYOffset;
      if (this.prevScrollpos > currentScrollPos) {
        if (this.header) {
          this.renderer.setStyle(this.header.nativeElement, 'top', '0');
        }
      } else {
        if (this.header) {
          this.renderer.setStyle(this.header.nativeElement, 'top', '-105px');
          this.renderer.setStyle(this.header.nativeElement, 'marginTop', '0px');
        }
      }
      this.prevScrollpos = currentScrollPos;
  }
  showCart(){
    this.products = JSON.parse(localStorage.getItem("Cart")!);
    if(this.products.length==0){
      this.cartProduct=false
    }else{
      this.cartProduct=true
    }
    this.pay=0
    for (let i = 0; i < this.products.length; i++) {
      this.pay=this.pay+this.products[i].total
    }

  }
  MinusP(i:number){
    if(this.products[i].quantity<2) {
      this.products[i].quantity =1;
    }else{
    this.products[i].quantity--;
    }
    this.products[i].total=this.products[i].quantity*this.products[i].price
    this.pay=0
    for (let i = 0; i < this.products.length; i++) {
      this.pay=this.pay+this.products[i].total
    }
    localStorage.setItem("Cart", JSON.stringify(this.products));
  }

  PlusP(i:number){
    if(this.products[i].quantity>this.products[i].Soluong-1){
      this.products[i].quantity=this.products[i].Soluong;
    }else{
    this.products[i].quantity++;
    }
    this.products[i].total=this.products[i].quantity*this.products[i].price
    this.pay=0
    for (let i = 0; i < this.products.length; i++) {
      this.pay=this.pay+this.products[i].total
    }
    localStorage.setItem("Cart", JSON.stringify(this.products));
  }
  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);
        sessionStorage.setItem("Account", JSON.stringify(this.user))
      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
  onLogout():void{
    this.user='';
    sessionStorage.removeItem('checkLogin');
    this.showBox(false,false,false);
    this.authService.isLoggedIn=false
  }
  deleteP(i:number){
    this.cartService.deleteProduct(i);
  }
  toProductPage(i:number){
    this.navService.productSearch(i);
    this.router.navigate(['trangsp'])
  }
  pSearch1(): void {
    let pS = (document.getElementById('search-bar__input1') as HTMLInputElement).value;
    this.navService.productSearch(pS);
    this.router.navigate(['trangsp']);
  }
  pSearch(): void {
    let pS = (document.getElementById('search-bar__input') as HTMLInputElement).value;
    this.navService.productSearch(pS);
    this.router.navigate(['trangsp']);
  }
  showSubnav(): void {
    const element = document.getElementById("showSubnav");
    if (element) {
      element.classList.toggle("activate");
    }
  }


  showHeaderList(): void {
    const element = document.getElementById("header__list-container");
    if (element) {
      element.classList.toggle("activate");
    }
  }

}
