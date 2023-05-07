import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, Product } from '../product';
import { ProductService } from '../product.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../cart.service';
import { CartItem } from '../cart';
import { AuthService } from '../auth.service';

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
  productEvaluate:any[]=[]
  public allProducts: IProduct[] = [];
  constructor(private authService:AuthService ,private cartService: CartService,public dialog: MatDialog,private activateRoute:ActivatedRoute,private _service: ProductService,private router:Router) {
    this.allProducts = [];
    activateRoute.paramMap.subscribe(
      (param)=>{
        this.id=param.get('id')
        if(this.id!=null)
        {
          this._service.getProduct(this.id).subscribe({
            next:(data)=>{this.product=data},
            error:(err)=>{this.errMessage=err}
          })
          this._service.getEvaluates(this.id).subscribe({
            next:(data)=>{
              this.productEvaluate=data,
              console.log(data);

            },
            error:(err)=>{this.errMessage=err}
          })
        }
      }
    )

    this._service.getProducts().subscribe({
      next:(data: IProduct[])=>{
        this.products=data.filter(p => p.Hang == this.product.Hang).slice(0,6)
        this.allProducts = data;
      },
      error:(err)=>{this.errMessage=err}
    })

  }
  addProduct() {
    if(this.authService.isLoggedIn==false){
      this.cartService.addToCart(this.product, this.a);
    }
    else{
      this.cartService.addToCartDB(this.product, this.a)
      .subscribe({
        next: (cart) => {
          console.log('Cart updated:', cart);
        },
        error: (error) => {
          console.log('Error updating cart:', error);
        }
      });
      this.cartService.createCartproduct(this.allProducts)

    }

  }
  ngOnInit(): void {

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



  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog)
  }
}
@Component({
  selector: 'thongbaothemsp',
  templateUrl: 'thongbaothemsp.html',
  encapsulation: ViewEncapsulation.None
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
