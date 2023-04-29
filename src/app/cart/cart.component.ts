import {  Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {  ElementRef, Output, EventEmitter } from '@angular/core';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @ViewChild('header') header!: ElementRef;
  @Output() searchEvent = new EventEmitter<string>();
  prevScrollpos = 0;
  hide = true;
  showLoginBox = false;
  showCartBox=false;
  showSearchBox=false;
  products:any;
  pay:number=0;
  message = '';
  user:any;
  errMessage:string=''
  cartProduct:any[]=[]
  brands:any[]=[]
  tempProduct:any[]=[]
  // items: Icart[] = [];

  constructor(private cartService:CartService){
    if(sessionStorage.getItem('checkLogin') === '1'){
      this.cartProduct = JSON.parse(sessionStorage.getItem('Cart') || '{}')
      this.brands=[...new Set(this.cartProduct.map(item => item.Hang))]
    }else{
      this.cartProduct = JSON.parse(localStorage.getItem('Cart') || '{}')
      this.brands=[...new Set(this.cartProduct.map(item => item.Hang))]
    }
    this.cartProduct=this.cartProduct.map(item => ({ ...item, completed: false }));
  }


  allComplete: boolean = false;


  updateAllComplete() {
    this.allComplete = this.cartProduct != null && this.cartProduct.every(b => b.completed);
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
  }
  setBrandAll(completed: boolean,brand:string) {
    this.tempProduct=this.cartProduct.filter(p=>p.Hang==brand)

    this.allComplete = completed;
    if (this.tempProduct == null) {
      return;
    }
    this.tempProduct.forEach(p => (p.completed = completed));
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


}
