import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, retry, throwError } from 'rxjs';
import { Cart, CartItem } from './cart';
import { ProductService } from './product.service';
import data from '@iconify/icons-mdi/target';
import { IProduct } from './product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:4000';
  public cartUpdated = new Subject<void>();
  public cartProducts: any[] = [];
  public cartAddProduct:any[]=[];
  errMessage: string='dd';
  public products:any[]=[];
  constructor(private http: HttpClient,private productService:ProductService,private authService:AuthService ) {


  }

  public addToCartDB(product:any, quantity: number):Observable<Cart> {
    const cartTemp=JSON.parse(localStorage.getItem('Cart') || '{}');
    const account = JSON.parse(sessionStorage.getItem('Account') || '{}');
    if (!account.cart) {
      account.cart = new Cart();
    }
    if (!account.cart.cartItems) {
      account.cart.cartItems = []; // Khởi tạo 'cartItems' là một mảng trống nếu không tồn tại
    }
    const _id = account._id;
    let cartItemss=account.cart
    if(cartTemp!= null){
      for (let i = 0; i < cartTemp.length; i++) {
        cartItemss.push(new CartItem(cartTemp[i]._id, cartTemp[i].quantity));
        for (let i = 0; i < cartItemss.length; i++) {
          for (let j = i+1; j < cartItemss.length; j++) {
            if(cartItemss[i].productID==cartItemss[j].productID){
              cartItemss[i].quantity+=cartItemss[j].quantity
              cartItemss.splice(j, 1);
              if(cartItemss[i].quantity>product.Soluong){
                cartItemss[i].quantity=product.Soluong
              }
            }
          }
        }
      }
      localStorage.removeItem('Cart')
    }
    cartItemss.push(new CartItem(product._id, quantity));
    console.log(cartItemss);

    for (let i = 0; i < cartItemss.length; i++) {
      for (let j = i+1; j < cartItemss.length; j++) {
        if(cartItemss[i].productID==cartItemss[j].productID){
          cartItemss[i].quantity+=cartItemss[j].quantity
          cartItemss.splice(j, 1);
          if(cartItemss[i].quantity>product.Soluong){
            cartItemss[i].quantity=product.Soluong
          }
        }
      }
    }
    console.log(account.cart);
    account.cart.cartItems=cartItemss
    sessionStorage.setItem('Account', JSON.stringify(account))

    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType:"text"
    };
    return this.http.put<Cart>("http://localhost:4000/cart/"+_id,account.cart, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  public createCartproduct(allProducts:IProduct[]){
    const account = JSON.parse(sessionStorage.getItem('Account') || '{}');
    this.cartAddProduct=[]
    let cartItemss=account.cart
    if(cartItemss!=null)
    {
      for (let i = 0; i < allProducts.length; i++) {
        for (let j = 0; j < cartItemss.length; j++) {
          if (allProducts[i]._id===cartItemss[j].productID) {
            this.cartAddProduct[this.cartAddProduct.length] = allProducts[i];
            this.cartAddProduct[this.cartAddProduct.length - 1].quantity = cartItemss[j].quantity;
            if(allProducts[i].Discount>0){
              this.cartAddProduct[this.cartAddProduct.length - 1].price =allProducts[i].Price-allProducts[i].Price*allProducts[i].Discount /100
            }else{
              this.cartAddProduct[this.cartAddProduct.length - 1].price =allProducts[i].Price
            }
            this.cartAddProduct[this.cartAddProduct.length - 1].total = this.cartAddProduct[this.cartAddProduct.length - 1].price * cartItemss[j].quantity;
          }
        }
      }
    }
    this.cartAddProduct[this.cartAddProduct.length - 1].completed=false
    sessionStorage.setItem("Cart", JSON.stringify(this.cartAddProduct));
    this.loadCartDB()
    this.cartUpdated.next();
  }
  public addToCart(product: any,quantity:number) {
    this.cartAddProduct[this.cartAddProduct.length] = product;
    this.cartAddProduct[this.cartAddProduct.length - 1].quantity = quantity;
    if(product.Discount>0){
      this.cartAddProduct[this.cartAddProduct.length - 1].price =product.Price-product.Price*product.Discount /100
    }else{
      this.cartAddProduct[this.cartAddProduct.length - 1].price =product.Price
    }
    this.cartAddProduct[this.cartAddProduct.length - 1].total = this.cartAddProduct[this.cartAddProduct.length - 1].price * quantity;
    for (let i = 0; i < this.cartAddProduct.length - 1; i++) {
      for (let j = i + 1; j < this.cartAddProduct.length; j++) {
        if (this.cartAddProduct[i].MaSP == this.cartAddProduct[j].MaSP) {
          this.cartAddProduct[i].quantity += this.cartAddProduct[j].quantity;
          this.cartAddProduct[i].total += this.cartAddProduct[j].total;
          this.cartAddProduct.splice(j, 1);
          if(this.cartAddProduct[i].quantity>product.Soluong){
            this.cartAddProduct[i].quantity=product.Soluong
            this.cartAddProduct[i].total=this.cartAddProduct[i].price*this.cartAddProduct[i].quantity
          }
        }
      }
    }
    this.cartAddProduct[this.cartAddProduct.length - 1].completed=false
    localStorage.setItem("Cart", JSON.stringify(this.cartAddProduct));
    this.loadCart();
    this.cartUpdated.next();
  }
  public deleteProduct(i:number){
    this.cartAddProduct = JSON.parse(localStorage.getItem('Cart') || '{}');
    this.cartAddProduct.splice(i,1);
    localStorage.setItem("Cart", JSON.stringify(this.cartAddProduct));
    this.loadCart();
    this.cartUpdated.next();
  }
  public deleteProductDB(i:number):Observable<Cart>{
    const account = JSON.parse(sessionStorage.getItem('Account') || '{}');
    let CartP= JSON.parse(sessionStorage.getItem('Cart')||'{}')
    let cartItemss=account.cart
    const _id = account._id;
    cartItemss.splice(i,1)
    CartP.splice(i,1)
    console.log(cartItemss);
    console.log(CartP);
    sessionStorage.setItem("Cart", JSON.stringify(CartP));
    sessionStorage.setItem('Account', JSON.stringify(account))
    this.loadCartDB();
    this.cartUpdated.next();
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const requestOptions: Object = {
      headers: headers
    };
    return this.http.put<Cart>("http://localhost:4000/cart/"+_id,account.cart, requestOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public getCartUpdatedListener() {
    return this.cartUpdated.asObservable();
  }

  public loadCart() {
    this.cartAddProduct = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")!) : [];
  }
  public loadCartDB() {
    this.cartAddProduct = sessionStorage.getItem("Cart") ? JSON.parse(sessionStorage.getItem("Cart")!) : [];
  }
  handleError(error:HttpErrorResponse){
    return throwError(()=>new Error(error.message))
  }

}
