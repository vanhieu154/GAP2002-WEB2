import {  Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  pay:number=0;
  cartProduct:any[]=[]
  brands:any[]=[]
  tempProduct:any[]=[]
  productLocation:number=0;
  cartItemCount: number=0;
  errMessage: any;
  constructor(private cartService:CartService,private router:Router,private authService:AuthService, public dialog: MatDialog, private _pService:ProductService){

    if (sessionStorage.getItem('checkLogin') === '1') {
      authService.isLoggedIn=true;

      cartService.loadCartDB();
    }else{
      cartService.loadCart()

    }
    cartService.getCartUpdatedListener().subscribe(() => {
      this.cartItemCount = cartService.cartAddProduct.length;
      this.cartProduct = cartService.cartAddProduct;
      this.brands=[...new Set(this.cartProduct.map(item => item.Hang))]

    });
    this.cartItemCount = cartService.cartAddProduct.length;
    this.cartProduct = cartService.cartAddProduct;
    this.brands=[...new Set(this.cartProduct.map(item => item.Hang))]
    this.cartProduct=this.cartProduct.map(item => ({ ...item, completed: false }));
  }


  allComplete: boolean = false;


  updateAllComplete() {
    this.allComplete = this.cartProduct != null && this.cartProduct.every(b => b.completed);
    this.updateTotalPrice()

  }


  someComplete(): boolean {
    if (this.cartProduct == null) {
      return false;
    }
    return this.cartProduct.filter(p => p.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.cartProduct == null) {
      return;
    }
    this.cartProduct.forEach(b => (b.completed = completed));
    this.updateTotalPrice()

  }
  setBrandAll(completed: boolean,brand:string) {
    this.tempProduct=this.cartProduct.filter(p=>p.Hang==brand)

    this.allComplete = completed;
    if (this.tempProduct == null) {
      return;
    }
    this.tempProduct.forEach(p => (p.completed = completed));
    this.updateTotalPrice()
  }

  isBrandComplete(brand: string): boolean {
    const brandItems = this.cartProduct.filter(c => c.Hang === brand);
    return brandItems.length > 0 && brandItems.every(c => c.completed);
  }

  isBrandIndeterminate(brand: string): boolean {
    const brandItems = this.cartProduct.filter(c => c.Hang === brand);
    const completedItems = brandItems.filter(c => c.completed);

    return completedItems.length > 0 && completedItems.length < brandItems.length;
  }
	Detail(p: any) {
    p.ClickCounter= p.ClickCounter+1
    this._pService.putProduct(p).subscribe({
      next:(data)=>{p=data},
      error:(err)=>{this.errMessage=err}
    })
		this.router.navigate(['chitietsp', p._id])
	}
  getProductLocation(p:any){
    for (let i = 0; i < this.cartProduct.length; i++) {
      if(this.cartProduct[i]._id===p._id){
        this.productLocation=i
      }

    }
  }
  deleteP(c: any) {
    this.getProductLocation(c)

    // Tạo một hộp thoại xác nhận xóa
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '417px',
      data: {}
    });

    // Xử lý hành động khi người dùng bấm nút Yes hoặc No trong hộp thoại
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Nếu người dùng bấm Yes, thực hiện xóa sản phẩm
        if (sessionStorage.getItem('checkLogin') === '1') {
          this.cartService.deleteProductDB(this.productLocation)
            .subscribe({
              next: (cart) => {
                console.log('Cart updated:', cart);
                alert('Product deleted successfully!');
              },
              error: (error) => {
                console.log('Error updating cart:', error);
              },
              complete: () => {
                console.log('Add to cart completed');
              }
            });
        } else {
          this.cartService.deleteProduct(this.productLocation);
        }
        this.updateTotalPrice();
      } else {
        // Nếu người dùng bấm No, không có gì xảy ra
        console.log('Delete canceled')
      }
    });
  }

  MinusP(c:any){
    this.getProductLocation(c)
    const i=this.productLocation
    if(this.authService.isLoggedIn==false){
      if(this.cartProduct[i].quantity<2) {
        this.cartProduct[i].quantity =1;
      }else{
      this.cartProduct[i].quantity--;
      }
      this.cartProduct[i].total=this.cartProduct[i].quantity*this.cartProduct[i].price
      this.pay=0
      for (let i = 0; i < this.cartProduct.length; i++) {
        this.pay=this.pay+this.cartProduct[i].total
      }
      localStorage.setItem("Cart", JSON.stringify(this.cartProduct));
    }else{
      if(this.cartProduct[i].quantity<2) {
        this.cartProduct[i].quantity =1;
      }else{
      this.cartProduct[i].quantity--;
      this.cartService.addToCartDB(this.cartProduct[i], -1)
      .subscribe({
        next: (cart) => {
          console.log('Cart updated:', cart);
        },
        error: (error) => {
          console.log('Error updating cart:', error);
        },
        complete: () => {
          console.log('Add to cart completed');
        }
      });
      sessionStorage.setItem("Cart", JSON.stringify(this.cartProduct));
      }
      this.cartProduct[i].total=this.cartProduct[i].quantity*this.cartProduct[i].price
      this.pay=0
      for (let i = 0; i < this.cartProduct.length; i++) {
        this.pay=this.pay+this.cartProduct[i].total
      }
    }
    this.updateTotalPrice()

  }
  PlusP(c:any){
    this.getProductLocation(c)
    const i=this.productLocation
    if(this.authService.isLoggedIn==false){
      if(this.cartProduct[i].quantity>this.cartProduct[i].Soluong-1){
        this.cartProduct[i].quantity=this.cartProduct[i].Soluong;
      }else{
      this.cartProduct[i].quantity++;
      }
      this.cartProduct[i].total=this.cartProduct[i].quantity*this.cartProduct[i].price
      this.pay=0
      for (let i = 0; i < this.cartProduct.length; i++) {
        this.pay=this.pay+this.cartProduct[i].total
      }
      localStorage.setItem("Cart", JSON.stringify(this.cartProduct));
    }else{
      if(this.cartProduct[i].quantity>this.cartProduct[i].Soluong-1){
        this.cartProduct[i].quantity=this.cartProduct[i].Soluong;
      }else{
      this.cartProduct[i].quantity++;
      this.cartService.addToCartDB(this.cartProduct[i], 1)
      .subscribe({
        next: (cart) => {
          console.log('Cart updated:', cart);
        },
        error: (error) => {
          console.log('Error updating cart:', error);
        },
        complete: () => {
          console.log('Add to cart completed');
        }
      });
      sessionStorage.setItem("Cart", JSON.stringify(this.cartProduct));
      }
      this.cartProduct[i].total=this.cartProduct[i].quantity*this.cartProduct[i].price
      this.pay=0
      for (let i = 0; i < this.cartProduct.length; i++) {
        this.pay=this.pay+this.cartProduct[i].total
      }

    }
    this.updateTotalPrice()

  }
  updateTotalPrice(): void {
    this.pay = 0;
    this.cartProduct.forEach(c => {
      if (c.completed) {
        this.pay += c.total;
      }
    });
  }

  createOrder(){
    this.tempProduct=this.cartProduct.filter(c=>c.completed==true)
    if(this.tempProduct.length>0){
      localStorage.setItem('Order',JSON.stringify(this.tempProduct))
      this.router.navigate(['/DeliveryInfor'])
    }else{


      console.log('chưa có sản phẩm trong giỏ hàng');


    }

  }



}
