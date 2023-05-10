import { Component, OnInit  } from '@angular/core';
import { PromotionService } from '../promotion.service';
import { Coupon } from '../coupon';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { Promotion } from '../promotion';

@Component({
  selector: 'app-promotion-page',
  templateUrl: './promotion-page.component.html',
  styleUrls: ['./promotion-page.component.css']
})
export class PromotionPageComponent implements OnInit {
  days: string | number = '00';
  hours: string | number = '00';
  minutes: string | number = '00';
  seconds: string | number = '00';
  coupons:any[]=[]
  private launchDate: number = new Date("2023-05-12T00:00:00.000Z").getTime();
  errMessage: any;
  numPage:number=1
  page:number=1
  displayedCoupons: Coupon[] = [];
  promotionProduct:Product[]=[]
  promotion=new Promotion()
  constructor(private router:Router, private promotionService:PromotionService, private productService:ProductService){
    this.promotionService.getCoupons().subscribe({
      next: (data) => {
        this.page=Math.ceil(data.length/3)
        this.coupons = data
        this.coupons = data.filter((coupon: { Ngayketthuc: string }) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const couponEndDate = new Date(coupon.Ngayketthuc);
          return couponEndDate > today;
        });
        this.displayedCoupons=this.coupons.slice(0,3)
      },
      error: (err) => { this.errMessage = err; }
    });
    this.promotionService.getPromotions().subscribe({
      next: (data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.promotion = data.filter((promotion: { Ngaybatdau: string ; Ngayketthuc: string ; }) => {
          const ngayBatDau = new Date(promotion.Ngaybatdau);
          const ngayKetThuc = new Date(promotion.Ngayketthuc);
          return ngayBatDau <= today && ngayKetThuc > today;
        });
        console.log(this.promotion);

      },
      error: (err) => {
        this.errMessage = err;
      }
    });
    this.productService.getProducts().subscribe({
      next:(data)=>{this.promotionProduct=data.filter((p: { Discount: number; })=>p.Discount>0)},
      error:(err)=>{this.errMessage=err}
    })
  }
  ngOnInit() {
    setInterval(() => {
      this.tick();
    }, 1000);

  }
  nextPage(){
    if(this.numPage<this.page){
      this.numPage=this.numPage+1
      this.displayedCoupons=this.coupons.slice((this.numPage - 1) * 3, this.numPage * 3)
    }
  }

  prevPage(){
    if(this.numPage> 1){
      this.numPage=this.numPage-1
      this.displayedCoupons=this.coupons.slice((this.numPage - 1) * 3, this.numPage * 3)
    }
  }
  Detail(p: any) {
		this.router.navigate(['chitietsp', p._id])
	}
  private tick(): void {
    // Get current time
    const now: number = new Date().getTime();

    // Get the difference in time to get time left until reaches 0
    const t: number = this.launchDate - now;

    // Check if time is above 0
    if (t > 0) {
      // Algorithm to calculate days...
      this.days = Math.floor(t / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');

      // Algorithm to calculate hours
      this.hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');

      // Algorithm to calculate minutes
      this.minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');

      // Algorithm to calculate seconds
      this.seconds = Math.floor((t % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }
  }


}
