import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { Brand, Icart } from './icart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
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


}
