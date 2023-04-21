import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-chitietsp',
  templateUrl: './chitietsp.component.html',
  styleUrls: ['./chitietsp.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChitietspComponent implements OnInit{
  product=new Product();
  errMessage:string=''
  id:any;
  products:any;
  items: any[] = [];
  a:number=1;
  panelOpenState = false;
  constructor(private activateRoute:ActivatedRoute,private _service: ProductService,private router:Router)
  {
    activateRoute.paramMap.subscribe(
      (param)=>{
        this.id=param.get('id')
        if(this.id!=null)
        {
          this._service.getProduct(this.id).subscribe({
            next:(data)=>{this.product=data},
            error:(err)=>{this.errMessage=err}
          })
        }
      }
    )

    this._service.getProducts().subscribe({
      next:(data: IProduct[])=>{
        this.products=data.filter(p => p.Hang == this.product.Hang).slice(0,6)

      },
      error:(err)=>{this.errMessage=err}
    })
  }
  ngOnInit(): void {
        // let amountElement = document.getElementById('amount')!;
    // let amount=amountElement.value;
    // let render=(amount) =>{
    //     amountElement.value=amount;
    // }
    // handleMinus(){
    //   if(amount>this.product.Soluong-1){
    //     amount=this.product.Soluong;
    //   }else{
    //   amount++;
    //   }
    //   render(amount);
    // }
  }
  Detail(p:any){
    this.router.navigate(['chitietsp',p._id])
  }
  handleMinus(){
    if(this.a<2) {
      this.a =1;
    }else{
    this.a--;
  }

  }
  handlePlus(){
    if(this.a>this.product.Soluong-1){
      this.a=this.product.Soluong;
    }else{
    this.a++;
    }
  }

  addProduct(){
    let addSP: any[] = sessionStorage.getItem("Cart") ? JSON.parse(sessionStorage.getItem("Cart")!) : [];
    addSP[addSP.length] = this.product;
    addSP[addSP.length - 1].quantity = this.a;
    if(this.product.Discount>0){
      addSP[addSP.length - 1].price =this.product.Price-this.product.Price*this.product.Discount /100
    }else{
      addSP[addSP.length - 1].price =this.product.Price
    }
    addSP[addSP.length - 1].total = addSP[addSP.length - 1].price * this.a;
    for (let i = 0; i < addSP.length - 1; i++) {
      for (let j = i + 1; j < addSP.length; j++) {
        if (addSP[i].MaSP == addSP[j].MaSP) {
          addSP[i].quantity += addSP[j].quantity;
          addSP[i].total += addSP[j].total;
          addSP.splice(j, 1);
          if(addSP[i].quantity>this.product.Soluong){
            addSP[i].quantity=this.product.Soluong
            addSP[i].total=addSP[i].price*addSP[i].quantity
          }
        }
      }
    }
    console.log(addSP[addSP.length-1]._id);
    sessionStorage.setItem("Cart", JSON.stringify(addSP));
  }
}
