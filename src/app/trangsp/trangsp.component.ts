import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { IProduct } from '../product';

@Component({
  selector: 'app-trangsp',
  templateUrl: './trangsp.component.html',
  styleUrls: ['./trangsp.component.css']
})
export class TrangspComponent implements OnInit{
  product=new Product();
  products:IProduct[]=[];
  errMessage:string=''
  http: any;
  perPage: number =12
  page:number=1
  numPage:number=1
  showProducts:any
  allPage:any=[];
  tempProducts:IProduct[]=[];
  brands:any=[];
  selectedBrands: any = [];
  selectedPrices: any = [];

  constructor(private _service: ProductService,private router:Router){
    this._service.getProducts().subscribe({
      next:(data:IProduct[])=>{
        this.products=data;
        this.page= Math.ceil(this.products.length/this.perPage);
        this.showProducts=this.products.slice((this.numPage-1)*this.perPage,this.numPage*this.perPage)
        for (let index = 0; index < this.page; index++) {
          this.allPage.push(index+1);
        }

        this.tempProducts=this.products
        for (let i = 0; i < this.products.length; i++) {
          this.brands.push(this.products[i].Hang);
        }
        this.brands = [...new Set(this.products.map(item => item.Hang))];
        console.log(this.brands);



      },
      error:(err)=>{this.errMessage=err}
    })
  }
  ngOnInit(): void {
    // this.selectedBrands = {};
  }


  showAllProducts(){
    this.tempProducts=this.products;
    this.showProduct(1,this.products)
  }

  showTypeProducts(t:string){
    this.tempProducts=this.tempProducts.filter(p => p.LoaiSP==t)
    if(this.tempProducts.length==0){
      this.tempProducts=this.products.filter(p => p.LoaiSP==t)
    }
    this.showProduct(1,this.tempProducts)
  }


  showProduct(n: number,a:any){
    this.allPage=[];
    this.numPage=n
    window.scrollTo(0, 0);
    this.showProducts=this.tempProducts.slice((n-1)*this.perPage,n*this.perPage)
    this.page= Math.ceil(this.tempProducts.length/this.perPage);
    for (let index = 0; index < this.page; index++) {
      this.allPage.push(index+1);
    }
  }



  productsFilter(){
    this.selectedBrands = Object.keys(this.selectedBrands).filter(brand => this.selectedBrands[brand]);
    console.log(this.selectedBrands); // mảng chứa các brand có giá trị true


  }

  nextPage(){
    if(this.numPage<this.page){
      this.numPage=this.numPage+1
      window.scrollTo(0, 0);
      this.showProducts=this.tempProducts.slice((this.numPage-1)*this.perPage,this.numPage*this.perPage)
    }
  }

  prevPage(){
    if(this.numPage>1){
      this.numPage=this.numPage-1
      window.scrollTo(0, 0);
      this.showProducts=this.tempProducts.slice((this.numPage-1)*this.perPage,this.numPage*this.perPage)
    }
  }

  Detail(p:any){
    this.router.navigate(['chitietsp',p._id])
  }


}
