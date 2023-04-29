
import { CartService } from './cart.service';
import { Brand, Icart } from './icart';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductService } from '../product.service';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


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
  cartProduct=false;
  products:any;
  pay:number=0;
  username = '';
  password = '';
  message = '';
  user:any;
  errMessage:string=''
  items: Icart[] = [];



    constructor(private cartService: CartService) {
        this.items = this.cartService.getItems();
    }




    brand: Brand = {
      name: 'SHIEN',
      completed: false,
      products: [
        { name: 'Áo nữ Xù nhỏ cắt loại bướm giải trí', dongia: 80000, soluong: 1, sotien: 80000, kichthuoc: "freesize", hinh: "assets/Img/sp1.png", completed: false },
      ],
      dongia: 0,
      soluong: 0,
      sotien: 0,
      hinh: '',
      kichthuoc: ''
    };


    allComplete: boolean = false;


    updateAllComplete() {
      this.allComplete = this.brand.products != null && this.brand.products.every(b => b.completed);
    }


    someComplete(): boolean {
      if (this.brand.products == null) {
        return false;
      }
      return this.brand.products.filter(b => b.completed).length > 0 && !this.allComplete;
    }


    setAll(completed: boolean) {
      this.allComplete = completed;
      if (this.brand.products == null) {
        return;
      }
      this.brand.products.forEach(b => (b.completed = completed));
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



}
