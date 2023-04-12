import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trangsp',
  templateUrl: './trangsp.component.html',
  styleUrls: ['./trangsp.component.css']
})
export class TrangspComponent {
  product=new Product();
  products:any
  errMessage:string=''
  http: any;
  constructor(private _service: ProductService,private router:Router){
    this._service.getProducts().subscribe({
      next:(data)=>{this.products=data},
      error:(err)=>{this.errMessage=err}
    })
  }

}
