import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Icart } from './icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private h:HttpClient) { }
  items: Icart[] = [];
  // addToCart(sp: ISanpham){
  //   var c:Icart;
  //   c ={
  //     tensp: sp.id,
  //     giasp: sp.giasp,
  //     hinh: sp.hinh,
  //     soluong:1
  //   }
  //   this.items.push(c);
  // }
  getItems(){ return this.items;}
  clearCarrt(){this.items=[]; return this.items;}
}
