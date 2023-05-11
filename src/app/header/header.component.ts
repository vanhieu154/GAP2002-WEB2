import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavService } from '../nav.service';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { IProduct } from '../product';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LackInformationComponent } from '../lack-information/lack-information.component';
import { PromotionService } from '../promotion.service';
import { NoProductDialogComponent } from '../no-product-dialog/no-product-dialog.component';
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
  IsCartProduct=false;
  products: any[]=[];
  pay:number=0;
  username = '';
  password = '';
  message = '';
  user:any;
  errMessage:string='';
  public cartItemCount = 0;
  hidden = false;
  cartProducts: any[]=[];
  allProducts:any[]=[];
  tempProduct:any=null
  promotion:any=[]
  constructor(private promotionService:PromotionService,private cartService: CartService,private renderer: Renderer2, private elementRef: ElementRef,public authService: AuthService,private router:Router,private navService: NavService,private productService:ProductService,public dialog: MatDialog,private promontionService:PromotionService,)  {
    if (sessionStorage.getItem('checkLogin') === '1') {
      authService.isLoggedIn=true;
      cartService.loadCartDB();
    }else{
      cartService.loadCart()
    }
    cartService.getCartUpdatedListener().subscribe(() => {
      this.cartItemCount = cartService.cartAddProduct.length;
      this.cartProducts = cartService.cartAddProduct;
    });
    this.allProducts = [];
    this.productService.getProducts().subscribe({
      next:(data: IProduct[])=>{
        this.allProducts = data;
      },
      error:(err)=>{this.errMessage=err}
    })
  }
  ngOnInit(): void {
    this.cartItemCount = this.cartService.cartAddProduct.length;
    this.cartProducts = this.cartService.cartAddProduct
    this.cartService.getCartUpdatedListener().subscribe(() => {
      this.cartItemCount = this.cartService.cartAddProduct.length;
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

    this.promotionService.getActivatePromotions().subscribe({
      next: (data) => {
        this.promotion=data},
      error: (err) => {
        this.errMessage = err;
      }
    });
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
    if(this.cartProducts.length==0){
      this.IsCartProduct=false
    }else{
      this.IsCartProduct=true
    }
    this.pay=0
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.pay=this.pay+this.cartProducts[i].total
    }
  }
  MinusP(i:number){
    if(this.authService.isLoggedIn==false){
      if(this.cartProducts[i].quantity<2) {
        this.cartProducts[i].quantity =1;
      }else{
      this.cartProducts[i].quantity--;
      }
      this.cartProducts[i].total=this.cartProducts[i].quantity*this.cartProducts[i].price
      this.pay=0
      for (let i = 0; i < this.cartProducts.length; i++) {
        this.pay=this.pay+this.cartProducts[i].total
      }
      localStorage.setItem("Cart", JSON.stringify(this.cartProducts));
    }else{
      if(this.cartProducts[i].quantity<2) {
        this.cartProducts[i].quantity =1;
      }else{
      this.cartProducts[i].quantity--;
      this.cartService.addToCartDB(this.cartProducts[i], -1)
      .subscribe({
        next: (cart) => {
          // console.log('Cart updated:', cart);
        },
        error: (error) => {
          // console.log('Error updating cart:', error);
        },
        complete: () => {
          // console.log('Add to cart completed');
        }
      });
      sessionStorage.setItem("Cart", JSON.stringify(this.cartProducts));
      }
      this.cartProducts[i].total=this.cartProducts[i].quantity*this.cartProducts[i].price
      this.pay=0
      for (let i = 0; i < this.cartProducts.length; i++) {
        this.pay=this.pay+this.cartProducts[i].total
      }
    }

  }

  PlusP(i:number){
    if(this.authService.isLoggedIn==false){
      if(this.cartProducts[i].quantity>this.cartProducts[i].Soluong-1){
        this.cartProducts[i].quantity=this.cartProducts[i].Soluong;
      }else{
      this.cartProducts[i].quantity++;
      }
      this.cartProducts[i].total=this.cartProducts[i].quantity*this.cartProducts[i].price
      this.pay=0
      for (let i = 0; i < this.cartProducts.length; i++) {
        this.pay=this.pay+this.cartProducts[i].total
      }
      localStorage.setItem("Cart", JSON.stringify(this.cartProducts));
    }else{
      if(this.cartProducts[i].quantity>this.cartProducts[i].Soluong-1){
        this.cartProducts[i].quantity=this.cartProducts[i].Soluong;
      }else{
      this.cartProducts[i].quantity++;
      this.cartService.addToCartDB(this.cartProducts[i], 1)
      .subscribe({
        next: (cart) => {
          // console.log('Cart updated:', cart);
        },
        error: (error) => {
          // console.log('Error updating cart:', error);
        },
        complete: () => {
          // console.log('Add to cart completed');
        }
      });
      sessionStorage.setItem("Cart", JSON.stringify(this.cartProducts));
      }
      this.cartProducts[i].total=this.cartProducts[i].quantity*this.cartProducts[i].price
      this.pay=0
      for (let i = 0; i < this.cartProducts.length; i++) {
        this.pay=this.pay+this.cartProducts[i].total
      }

    }
  }

  onLogin(): void {

    this.authService.login(this.username, this.password).subscribe({
      next: (data) => {
        this.user = data;
        sessionStorage.setItem("Account", JSON.stringify(this.user));
        if(this.user.message==null){
          this.showBox(false,false,false)
          let tempCart=JSON.parse(localStorage.getItem('Cart') || '{}');
          if (tempCart.length>0) {
            for (let i = 0; i < tempCart.length; i++) {
              this.cartService.addToCartDB(tempCart[i],tempCart[i].quantity )
              .subscribe({
                next: (cart) => {
                  // console.log('Cart updated:', cart);
                },
                error: (error) => {
                  // console.log('Error updating cart:', error);
                },
                complete: () => {
                  // console.log('Add to cart completed');
                }
              });
            }
          }
          localStorage.removeItem('Cart')
          this.cartItemCount = this.cartService.cartAddProduct.length;
          this.cartProducts = this.cartService.cartAddProduct;
          this.cartService.createCartproduct(this.allProducts);
          const dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '417px',
            height: '220px',
          });
          dialogRef.afterClosed().subscribe();
        }else{
          const dialogRef = this.dialog.open(LackInformationComponent, {
            width: '417px',
            height: '220px',
          });
          dialogRef.afterClosed().subscribe();

        }

      },
      error: (err) => {
        this.errMessage = err;
      }
    });
  }
  onLogout():void{
    this.user='';
    sessionStorage.removeItem('checkLogin');
    sessionStorage.removeItem('Account');
    sessionStorage.removeItem('Cart')
    this.showBox(false,false,false);
    this.authService.isLoggedIn=false;
    this.cartService.cartAddProduct = [];
    this.cartService.cartUpdated.next();
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '417px',
      height: '220px',
    });
    dialogRef.afterClosed().subscribe();
    this.router.navigate(['/'])
  }
  deleteP(i:number){
    if(sessionStorage.getItem('checkLogin') === '1'){
      this.cartService.deleteProductDB(i)
      .subscribe({
        next: (cart) => {
          // console.log('Cart updated:', cart);
        },
        error: (error) => {
          // console.log('Error updating cart:', error);
        }
      });
    }else{
      this.cartService.deleteProduct(i);

    }
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
  createOrder(){
    // this.tempProduct=null
    if(sessionStorage.getItem('checkLogin') === '1'){
      this.tempProduct=this.cartProducts.filter(c=>c.completed==true)
      if(this.tempProduct.length>0){
        console.log( this.tempProduct);

        localStorage.setItem('Order',JSON.stringify(this.tempProduct))
        this.router.navigate(['/DeliveryInfor'])
      }else{
        const dialogRef = this.dialog.open(NoProductDialogComponent, {
          width: '417px',
          height: '220px',
        });
        dialogRef.afterClosed().subscribe();
      }
    }else{
      alert("Bạn chưa đăng nhập")

    }
  }
  isBrandComplete(brand: string): boolean {
    const brandItems = this.cartProducts.filter(c => c.Hang === brand);
    return brandItems.length > 0 && brandItems.every(c => c.completed);
  }
  showHeaderList(): void {
    const element = document.getElementById("header__list-container");
    if (element) {
      element.classList.toggle("activate");
    }
  }

}
