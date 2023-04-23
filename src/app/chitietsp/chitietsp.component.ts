import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct, Product } from '../product';
import { ProductService } from '../product.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../cart.service';

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
  constructor(private cartService: CartService,public dialog: MatDialog,private activateRoute:ActivatedRoute,private _service: ProductService,private router:Router)
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
    this.cartService.addProduct(this.product, this.a);
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
