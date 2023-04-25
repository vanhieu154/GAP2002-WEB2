import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, retry, throwError } from 'rxjs';
import { Cart, CartItem } from './cart';
import { ProductService } from './product.service';
import data from '@iconify/icons-mdi/target';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:4000';
  private cartUpdated = new Subject<void>();
  public cartProducts: any[] = [];
  public products:any
  errMessage: any;

  constructor(private http: HttpClient, private _service: ProductService ) {
    this.loadCart();
    this._service.getProducts().subscribe({
      next:(data: IProduct[])=>{this.products=data},
      error: (err) => {this.errMessage = err}
    })
    console.log(this.products);

  }

  addToCart(productId: string, qty: number): Observable<Cart> {

    const account = JSON.parse(sessionStorage.getItem('Account') || '{}');

    console.log(account.cart.cartItems[0]);

    let cartItemss=account.cart.cartItems
    const _id = account._id;
    if (!account.cart) {
      account.cart = new Cart();
    }

    cartItemss.push(new CartItem(productId, qty));
    account.cart.total += qty;
    console.log();


    for (let i = 0; i < cartItemss.length; i++) {
      for (let j = i+1; j < cartItemss.length; j++) {
        if(cartItemss[i].productID===cartItemss[j].productID){
          cartItemss[i].qty+=cartItemss[j].qty
          cartItemss.splice(j, 1);
          // for(let p of this.products){
          //   if(cartItems[i].productID==p._id){
          //     if(cartItems[i].qty>p.quantity){
          //       cartItems[i].qty=p.quantity
          //     }
          //   }
          // }
        }
      }

    }
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const requestOptions: Object = {
      headers: headers
    };
    console.log(account.cart);
    sessionStorage.setItem('Account', JSON.stringify(account));
    return this.http.put<Cart>("http://localhost:4000/cart/"+_id,account.cart, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  // public addToCart(product: any,quantity:number) {
  //   let addSP: any[] = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")!) : [];
  //   addSP[addSP.length] = product;
  //   addSP[addSP.length - 1].quantity = quantity;
  //   if(product.Discount>0){
  //     addSP[addSP.length - 1].price =product.Price-product.Price*product.Discount /100
  //   }else{
  //     addSP[addSP.length - 1].price =product.Price
  //   }
  //   addSP[addSP.length - 1].total = addSP[addSP.length - 1].price * quantity;
  //   for (let i = 0; i < addSP.length - 1; i++) {
  //     for (let j = i + 1; j < addSP.length; j++) {
  //       if (addSP[i].MaSP == addSP[j].MaSP) {
  //         addSP[i].quantity += addSP[j].quantity;
  //         addSP[i].total += addSP[j].total;
  //         addSP.splice(j, 1);
  //         if(addSP[i].quantity>product.Soluong){
  //           addSP[i].quantity=product.Soluong
  //           addSP[i].total=addSP[i].price*addSP[i].quantity
  //         }
  //       }
  //     }
  //   }
  //   localStorage.setItem("Cart", JSON.stringify(addSP));
  //   this.loadCart();
  //   this.cartUpdated.next(); // phát ra sự kiện giỏ hàng được cập nhật
  // }
  public deleteProduct(i:number){
    this.cartProducts.splice(i,1);
    localStorage.setItem("Cart", JSON.stringify(this.cartProducts));
    this.loadCart();
    this.cartUpdated.next();
  }

  public getCartUpdatedListener() {
    return this.cartUpdated.asObservable();
  }

  private loadCart() {
    this.cartProducts = JSON.parse(localStorage.getItem("Cart")!) || [];
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

}
