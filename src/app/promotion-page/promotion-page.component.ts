import { Component, OnInit  } from '@angular/core';
import { PromotionService } from '../promotion.service';
import { Coupon } from '../coupon';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { Promotion } from '../promotion';
import { Discount, User } from '../user';
import { AuthService } from '../auth.service';

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
  promotion:any=[]
  user=new User()
  promotionStatus:string=''
  constructor(private router:Router, private promotionService:PromotionService, private productService:ProductService,private authService:AuthService){
    if(sessionStorage.getItem('checkLogin') === '1'){
      this.user=JSON.parse(sessionStorage.getItem('Account') || '{}')
    }
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
    this.promotionService.getActivatePromotionsPage().subscribe({
    next: (data) => {
      this.promotion=data
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const promotionStartDate= new Date(this.promotion.Ngaybatdau)
      if(promotionStartDate>today){
        this.promotionStatus="SẮP DIỄN RA:"
        this.launchDate=new Date(this.promotion.Ngaybatdau).getTime()
      }else{
        this.promotionStatus="ĐANG DIỄN RA:"
        this.launchDate=new Date(this.promotion.Ngayketthuc).getTime()
      }

    },
    error: (err) => {
      this.errMessage = err;
    }
    });
    this.promotionService.getActivatePromotionsProduct().subscribe({
      next:(data)=>{
        this.promotionProduct=data
        console.log(data);
      },
      error:(err)=>{this.errMessage=err}
    })

  }
  isDisabled(promotionId: any): boolean {
    return this.user.discount.some((discount) => discount.DiscountID === promotionId);
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

  saveCoupon(_id:any){
    if(sessionStorage.getItem('checkLogin') === '1'){
      // let account=JSON.parse(sessionStorage.getItem('Account') || '{}')
      this.user.discount.push(new Discount(_id,true))
      console.log(new Discount(_id,true));

      console.log(this.user);
      sessionStorage.setItem('Account',JSON.stringify(this.user))
      this.authService.updateUser(this.user).subscribe({
        next:(data)=>{this.user=data},
        error:(err)=>{this.errMessage=err}
      })

    }else{
      console.log("bạn chưa đăng nhập");

    }
  }
}
