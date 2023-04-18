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
        this.brands = [...new Set(this.products.map(item => item.Hang))];
        this.brands.forEach((brand: string ) => {
          this.selectedBrands[brand] = true;
        });
      },
      error:(err)=>{this.errMessage=err}
    })
  }
  ngOnInit(): void {
    this.checkAllPriceFilters();

  }
  checkAllPriceFilters() {
    this.selectedPrices = {
      100000: true,
      200000: true,
      300000: true,
      400000: true
    };
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

  isBrandFiltered(brand: string): boolean {
    return this.selectedBrands.hasOwnProperty(brand);
  }

  isPriceFiltered(price: number): boolean {
    return this.selectedPrices.hasOwnProperty(price);
  }

  productsFilter(){
    const selectedBrandsCopy = {...this.selectedBrands};
    const selectedBrands = Object.keys(selectedBrandsCopy).filter(brand => selectedBrandsCopy[brand]);
    // this.selectedPrices = {...this.selectedPricesSnapshot};
    // const selectedPricesCopy={...this.selectedPrices}
    // const selectedPrices = Object.keys(this.selectedPrices).filter(price => this.selectedPrices[price]);
    const priceFilters = Object.keys(this.selectedPrices).filter(price => this.selectedPrices[price]).map(Number);
    // console.log(priceFilters);
    // if(priceFilters==null){

    // }

    this.tempProducts = this.products.filter(product => {
      return selectedBrands.includes(product.Hang) && priceFilters.some((price: number) => price >= product.Price && price < product.Price + 100000);
    });
    this.showProduct(1, this.tempProducts);
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
