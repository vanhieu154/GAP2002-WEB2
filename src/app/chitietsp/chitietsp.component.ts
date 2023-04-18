import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-chitietsp',
  templateUrl: './chitietsp.component.html',
  styleUrls: ['./chitietsp.component.css']
})
export class ChitietspComponent implements OnInit{
  product=new Product();
  errMessage:string=''
  id:any;
  products:any;
  items: any[] = [];
  a:number=1;
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

  showDescription=()=>{
    document.getElementById("product__description-detail")!.classList.toggle("activate");
    document.getElementById("minus-icon-1")!.classList.toggle("deactivate");
    document.getElementById("plus-icon-1")!.classList.toggle("activate");
  }
  showEvaluate=()=>{
      document.getElementById("product-evaluate")!.classList.toggle("activate");
      document.getElementById("minus-icon-2")!.classList.toggle("deactivate");
      document.getElementById("plus-icon-2")!.classList.toggle("activate");

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

}
