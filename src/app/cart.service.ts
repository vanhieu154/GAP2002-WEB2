import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUpdated = new Subject<void>();
  public products: any[] = [];

  constructor() {
    this.loadCart();
  }

  public addProduct(product: any,quantity:number) {
    let addSP: any[] = localStorage.getItem("Cart") ? JSON.parse(localStorage.getItem("Cart")!) : [];
    addSP[addSP.length] = product;
    addSP[addSP.length - 1].quantity = quantity;
    if(product.Discount>0){
      addSP[addSP.length - 1].price =product.Price-product.Price*product.Discount /100
    }else{
      addSP[addSP.length - 1].price =product.Price
    }
    addSP[addSP.length - 1].total = addSP[addSP.length - 1].price * quantity;
    for (let i = 0; i < addSP.length - 1; i++) {
      for (let j = i + 1; j < addSP.length; j++) {
        if (addSP[i].MaSP == addSP[j].MaSP) {
          addSP[i].quantity += addSP[j].quantity;
          addSP[i].total += addSP[j].total;
          addSP.splice(j, 1);
          if(addSP[i].quantity>product.Soluong){
            addSP[i].quantity=product.Soluong
            addSP[i].total=addSP[i].price*addSP[i].quantity
          }
        }
      }
    }
    console.log(addSP[addSP.length-1]._id);
    localStorage.setItem("Cart", JSON.stringify(addSP));
    this.loadCart();
    this.cartUpdated.next(); // phát ra sự kiện giỏ hàng được cập nhật
  }
  public deleteProduct(i:number){
    this.products.splice(i,1);
    localStorage.setItem("Cart", JSON.stringify(this.products));
    this.loadCart();
    this.cartUpdated.next();
  }

  public getCartUpdatedListener() {
    return this.cartUpdated.asObservable();
  }

  private loadCart() {
    this.products = JSON.parse(localStorage.getItem("Cart")!) || [];
  }

}
