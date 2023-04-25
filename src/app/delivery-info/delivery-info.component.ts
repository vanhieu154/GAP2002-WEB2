
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductService } from '../product.service';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: '[app-delivery-info]',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeliveryInfoComponent {
  @ViewChild('header') header!: ElementRef;
  @Output() searchEvent = new EventEmitter<string>();
  prevScrollpos = 0;
  hide = true;
  showLoginBox = false;
  showCartBox=false;
  showSearchBox=false;
  cartProduct=false;
  products:any;
  pay:number=0;
  username = '';
  password = '';
  message = '';
  user:any;
  errMessage:string=''


public fullname:string=''
public email:string=''
public phone:string=''
public address:string=''
public province:string=''
public district:string=''
public districts: string[] =['Chọn Quận/ Huyện'];
selectedProvince =null;
selectedDistrict =null;
public selectedOption:string=''
public selectedPrice: any = null;
public selectedPay='Thanh toán khi nhận hàng (COD)';
contemporaryTotalPay: number = 0;
phoneNumberCheckResult: boolean | null = null;

displayPage: any;

  constructor(private router:Router,private productService:ProductService) {

  }

  showCart(){
    this.products = JSON.parse(localStorage.getItem("Cart")!);
    if(this.products.length==0){
      this.cartProduct=false
    }else{
      this.cartProduct=true
    }
    this.pay=0
    for (let i = 0; i < this.products.length; i++) {
      this.pay=this.pay+this.products[i].total
    }

  }


public VietNamdata =[
  {province: 'Chọn Tỉnh/ Thành phố'},
  {
    province: 'An Giang',
    district: [
      "Chọn Quận/Huyện","Thành phố Long Xuyên","Thành phố Châu Đốc","Thị xã Tân Châu","Huyện An Phú","Huyện Châu Phú","Huyện Châu Thành","Huyện Chợ Mới","Huyện Phú Tân","Huyện Thoại Sơn","Huyện Tịnh Biên","Huyện Tri Tôn",
    ],
  },
  {
    province: 'Bà Rịa - Vũng Tàu',
    district: [
      "Chọn Quận/Huyện","Thành phố Vũng Tàu","Thị xã Bà Rịa","Thị xã Phú Mỹ","Huyện Châu Đức","Huyện Côn Đảo","Huyện Đất Đỏ","Huyện Long Điền","Huyện Tân Thành","Huyện Xuyên Mộc"
    ],
  },
  {
    province: 'Bạc Liêu',
    district: [
      "Chọn Quận/Huyện","Thành phố Bạc Liêu","Huyện Đông Hải","Huyện Giá Rai","Huyện Hòa Bình","Huyện Hồng Dân","Huyện Phước Long","Huyện Vĩnh Lợi"
     ],
  },
  {
    province: 'Bắc Kạn',
    district: [
      "Chọn Quận/Huyện","Thị xã Bắc Kạn","Huyện Ba Bể","Huyện Bạch Thông","Huyện Chợ Đồn","Huyện Chợ Mới","Huyện Na Rì","Huyện Ngân Sơn","Huyện Pác Nặm"
     ],
  },
  {
    province: 'Bắc Giang',
    district: [
      "Chọn Quận/Huyện","Thành phố Bắc Giang","Huyện Hiệp Hòa","Huyện Lạng Giang","Huyện Lục Nam","Huyện Lục Ngạn","Huyện Sơn Động","Huyện Tân Yên","Huyện Việt Yên","Huyện Yên Dũng","Huyện Yên Thế"
    ],
  },
  {
    province: 'Bắc Ninh' ,
    district: [
      "Chọn Quận/Huyện","Thành phố Bắc Ninh","Thị xã Từ Sơn","Huyện Gia Bình","Huyện Lương Tài","Huyện Quế Võ","Huyện Thuận Thành","Huyện Tiên Du","Huyện Yên Phong",
    ]
  },
  {
    province: 'Bến Tre' ,
    district: [
      "Chọn Quận/Huyện","Thành phố Bến Tre","Huyện Ba Tri","Huyện Bình Đại","Huyện Châu Thành","Huyện Chợ Lách","Huyện Giồng Trôm","Huyện Mỏ Cày Bắc","Huyện Mỏ Cày Nam","Huyện Thạnh Phú",
    ]
  },
  {
    province: 'Bình Dương' ,
    district: [
      "Chọn Quận/Huyện","Thành phố Thủ Dầu Một","Thị xã Bến Cát","Thị xã Tân Uyên","Huyện Bắc Tân Uyên","Huyện Dầu Tiếng","Huyện Dĩ An","Huyện Phú Giáo","Huyện Tân Uyên","Huyện Thuận An",
    ]
  },
  {
    province: 'Bình Định' ,
    district: [
      "Chọn Quận/Huyện","Thành phố Quy Nhơn","Huyện An Lão","Huyện An Nhơn","Huyện Hoài  n","Huyện Hoài Nhơn","Huyện Phù Cát","Huyện Phù Mỹ","Huyện Tây Sơn","Huyện Tuy Phước","Huyện Vân Canh","Huyện Vĩnh Thạnh",
    ]
  },
  {
    province: 'Bình Phước' ,
    district: [ "Chọn Quận/Huyện","Thị xã Bình Long","Thị xã Đồng Xoài","Thị xã Phước Long","Huyện Bù Đăng","Huyện Bù Đốp","Huyện Bù Gia Mập","Huyện Chơn Thành","Huyện Đồng Phú","Huyện Hớn Quản","Huyện Lộc Ninh","Huyện Phú Riềng",
   ]
  },
  {
    province: 'Bình Thuận' ,
    district: [
      "Chọn Quận/Huyện","Thành phố Phan Thiết","Thị xã La Gi","Huyện Bắc Bình","Huyện Đảo Phú Quý","Huyện Đức Linh","Huyện Hàm Tân","Huyện Hàm Thuận Bắc","Huyện Hàm Thuận Nam","Huyện Tánh Linh","Huyện Tuy Phong" ,
   ]
  },
  {
    province: 'Cà Mau' ,
    district: [ "Chọn Quận/Huyện","Thành phố Cà Mau","Huyện Cái Nước","Huyện Đầm Dơi","Huyện Năm Căn","Huyện Ngọc Hiển","Huyện Phú Tân","Huyện Thới Bình","Huyện Trần Văn Thời","Huyện U Minh","Huyện Tuy Phong",
   ]
  },
  {
    province: 'Cao Bằng' ,
    district: [ "Chọn Quận/Huyện","Thị xã Cao Bằng","Huyện Bảo Lạc","Huyện Bảo Lâm","Huyện Hạ Lang","Huyện Hà Quảng","Huyện Hòa An","Huyện Nguyên Bình","Huyện Phục Hòa","Huyện Quảng Uyên","Huyện Thạch An","Huyện Thông Nông","Huyện Trà Lĩnh","Huyện Trùng Khánh",
   ]
  },
  {
    province: 'Cần Thơ' ,
    district: [ "Chọn Quận/Huyện","Quận Bình Thủy","Quận Cái Răng","Quận Ninh Kiều","Quận Ô Môn","Quận Thốt Nốt","Huyện Thới Lai","Huyện Cờ Đỏ","Huyện Phong Điền","Huyện Vĩnh Thạnh",
   ]
  },
  {
    province: 'Đà Nẵng' ,
    district: [ "Chọn Quận/Huyện","Quận Cẩm Lệ","Quận Hải Châu","Quận Liên Chiểu","Quận Ngũ Hành Sơn","Quận Sơn Trà","Quận Thanh Khê","Huyện Hòa Vang","Huyện Hoàng Sa",
   ]
  },
  {
    province: 'Đắk Lắk' ,
    district: ["Chọn Quận/Huyện", "Thành phố Buôn Ma Thuột","Thị xã Buôn Hồ","Huyện Buôn Đôn","Huyện Cư Kuin","Huyện Cư M'gar","Huyện Ea H'Leo","Huyện Ea Kar","Huyện Ea Súp","Huyện Krông Ana","Huyện Krông Bông","Huyện Krông Buk","Huyện Krông Năng","Huyện Krông Pắc","Huyện Lăk","Huyện M'Đrăk",
   ]
  },
  {
    province: 'Đắk Nông' ,
    district: [ "Chọn Quận/Huyện","Thị xã Gia Nghĩa","Huyện Cư Jút","Huyện Dăk GLong","Huyện Dăk Mil","Huyện Dăk R'Lấp","Huyện Dăk Song","Huyện Krông Nô","Huyện Tuy Đức",
   ]
  },
  {
    province: 'Đồng Nai' ,
    district: ["Chọn Quận/Huyện", "Thành phố Biên Hòa","Thị xã Long Khánh","Quận Tân Phú","Huyện Cẩm Mỹ","Huyện Định Quán","Huyện Long Thành","Huyện Nhơn Trạch","Huyện Thống Nhất","Huyện Trảng Bom","Huyện Vĩnh Cửu","Huyện Xuân Lộc",
   ]
  },
  {
    province: 'Đồng Tháp' ,
    district: [ "Chọn Quận/Huyện","Thành phố Cao Lãnh","Thị xã Sa Đéc","Thị xã Hồng Ngự","Huyện Châu Thành","Huyện Cao Lãnh","Huyện Huyện Hồng Ngự","Huyện Lai Vung","Huyện Lấp Vò","Huyện Tam Nông","Huyện Tân Hồng","Huyện Thanh Bình","Huyện Tháp Mười",
   ]
  },
  {
    province: 'Điện Biên' ,
    district: ["Chọn Quận/Huyện","Thành phố Điện Biên Phủ","Thị xã Mường Lay","Huyện Điện Biên","Huyện Điện Biên Đông","Huyện Mường Ảng","Huyện Mường Chà","Huyện Mường Nhé","Huyện Nậm Pồ","Huyện Tủa Chùa","Huyện Tuần Giáo" ,
   ]
  },
  {
    province: 'Gia Lai' ,
    district: [ "Chọn Quận/Huyện","Thành Phố Pleiku","Thị xã An Khê","Thị xã AYun Pa","Huyện Chư Păh","Huyện Chư Pưh","Huyện Chư Sê","Huyện ChưPRông","Huyện Đăk Đoa","Huyện Đăk Pơ","Huyện Đức Cơ","Huyện Ia Grai","Huyện Ia Pa","Huyện KBang","Huyện Kông Chro","Huyện Krông Pa","Huyện Mang Yang","Huyện Phú Thiện",
   ]
  },
  {
    province: 'Hà Giang' ,
    district: ["Chọn Quận/Huyện","Thành phố Hà Giang","Huyện Bắc Mê","Huyện Bắc Quang","Huyện Đồng Văn","Huyện Hoàng Su Phì","Huyện Mèo Vạc","Huyện Quản Bạ","Huyện Quang Bình","Huyện Vị Xuyên","Huyện Xín Mần","Huyện Yên Minh" ,
   ]
  },
  {
    province: 'Hà Nam' ,
    district: [ "Chọn Quận/Huyện","Thành phố Phủ Lý","Huyện Bình Lục","Huyện Duy Tiên","Huyện Kim Bảng","Huyện Lý Nhân","Huyện Thanh Liêm",
   ]
  },
  {
    province: 'Hà Nội' ,
    district: [ "Chọn Quận/Huyện","Quận Ba Đình","Huyện Ba Vì","Quận Bắc Từ Liêm","Quận Cầu Giấy","Huyện Chương Mỹ","Huyện Đan Phượng","Huyện Đông Anh","Quận Đống Đa","Huyện Gia Lâm","Quận Hà Đông","Quận Hai Bà Trưng","Huyện Hoài Đức","Quận Hoàn Kiếm","Quận Hoàng Mai","Quận Long Biên","Huyện Mê Linh","Huyện Mỹ Đức","Quận Nam Từ Liêm","Huyện Phú Xuyên","Huyện Phúc Thọ","Huyện Quốc Oai","Huyện Sóc Sơn","Thị xã Sơn Tây","Quận Tây Hồ","Huyện Thạch Thất","Huyện Thanh Oai","Huyện Thanh Trì","Quận Thanh Xuân","Huyện Thường Tín","Huyện Ứng Hòa",
   ]
  },
  {
    province: 'Hà Tĩnh' ,
    district: [ "Chọn Quận/Huyện","Thành phố Hà Tĩnh","Thị xã Hồng Lĩnh","Thị xã Kỳ Anh","Huyện Cẩm Xuyên","Huyện Can Lộc","Huyện Đức Thọ","Huyện Hương Khê","Huyện Hương Sơn","Huyện Lộc Hà","Huyện Nghi Xuân","Huyện Thạch Hà","Huyện Vũ Quang",
   ]
  },
  {
    province: 'Hải Dương' ,
    district: ["Chọn Quận/Huyện", "Thành phố Hải Dương","Thị xã Chí Linh","Huyện Bình Giang","Huyện Cẩm Giàng","Huyện Gia Lộc","Huyện Kim Thành","Huyện Kinh Môn","Huyện Nam Sách","Huyện Ninh Giang","Huyện Thanh Hà","Huyện Thanh Miện","Huyện Tứ Kỳ",
   ]
  },
  {
    province: 'Hải Phòng' ,
    district: ["Chọn Quận/Huyện", "Quận Đồ Sơn","Quận Dương Kinh","Quận Hải An","Quận Hồng Bàng","Quận Kiến An","Quận Lê Chân","Quận Ngô Quyền","Huyện An Dương","Huyện An Lão","Huyện Bạch Long Vĩ","Huyện Cát Hải","Huyện Kiến Thụy","Huyện Thủy Nguyên","Huyện Tiên Lãng","Huyện Vĩnh Bảo",
   ]
  },
  {
    province: 'Hòa Bình' ,
    district: ["Chọn Quận/Huyện", "Thành phố Hòa Bình","Huyện Cao Phong","Huyện Đà Bắc","Huyện Kim Bôi","Huyện Kỳ Sơn","Huyện Lạc Sơn","Huyện Lạc Thủy","Huyện Lương Sơn","Huyện Mai Châu","Huyện Tân Lạc","Huyện Yên Thủy",
   ]
  },
  {
    province: 'Hậu Giang' ,
    district: ["Chọn Quận/Huyện","Thành phố Vị Thanh","Thị xã Ngã Bảy","Huyện Châu Thành","Huyện Châu Thành A","Huyện Long Mỹ","Huyện Phụng Hiệp","Huyện Vị Thủy" ,
   ]
  },
  {
    province: 'Hưng Yên' ,
    district: ["Chọn Quận/Huyện", "Thành phố Hưng Yên","Huyện  n Thi","Huyện Khoái Châu","Huyện Kim Động","Huyện Mỹ Hào","Huyện Phù Cừ","Huyện Tiên Lữ","Huyện Văn Giang","Huyện Văn Lâm","Huyện Yên Mỹ",
   ]
  },
  {
    province: 'Thành phố Hồ Chí Minh' ,
    district: ["Chọn Quận/Huyện","Quận 1","Quận 2","Quận 3","Quận 4","Quận 5","Quận 6","Quận 7","Quận 8","Quận 9","Quận 10","Quận 11","Quận 12","Quận Bình Tân","Quận Bình Thạnh","Quận Gò Vấp","Quận Phú Nhuận","Quận Tân Bình","Quận Tân Phú","Quận Thủ Đức","Huyện Bình Chánh","Huyện Cần Giờ","Huyện Củ Chi","Huyện Hóc Môn","Huyện Nhà Bè" ,
   ]
  },
  {
    province: 'Khánh Hòa' ,
    district: ["Chọn Quận/Huyện", "Thành phố Nha Trang","Thị xã Cam Ranh","Thị xã Ninh Hòa","Huyện Cam Lâm","Huyện Diên Khánh","Huyện Khánh Sơn","Huyện Khánh Vĩnh","Huyện Trường Sa","Huyện Vạn Ninh",
   ]
  },
  {
    province: 'Kiên Giang' ,
    district: ["Chọn Quận/Huyện", "Thành phố Rạch Giá","Thị xã Hà Tiên","Huyện An Biên","Huyện An Minh","Huyện Châu Thành","Huyện Giang Thành","Huyện Giồng Riềng","Huyện Gò Quao","Huyện Hòn Đất","Huyện Kiên Hải","Huyện Kiên Lương","Huyện Phú Quốc","Huyện Tân Hiệp","Huyện U minh Thượng","Huyện Vĩnh Thuận",
   ]
  },
  {
    province: 'Kon Tum' ,
    district: ["Chọn Quận/Huyện", "Thành phố KonTum","Huyện Đăk Glei","Huyện Đăk Hà","Huyện Đăk Tô","Huyện Kon Plông","Huyện Kon Rẫy","Huyện Ngọc Hồi","Huyện Sa Thầy","Huyện Tu Mơ Rông","Huyện Ia H' Drai",
   ]
  },
  {
    province: 'Lai Châu' ,
    district: ["Chọn Quận/Huyện", "Thị xã Lai Châu","Huyện Mường Tè","Huyện Nậm Nhùn","Huyện Phong Thổ","Huyện Sìn Hồ","Huyện Tam Đường","Huyện Tân Uyên","Huyện Than Uyên",
   ]
  },
  {
    province: 'Lào Cai' ,
    district: ["Chọn Quận/Huyện","Thành phố Lào Cai","Huyện Bắc Hà","Huyện Bảo Thắng","Huyện Bảo Yên","Huyện Bát Xát","Huyện Mường Khương","Huyện Sa Pa","Huyện Văn Bàn","Huyện Xi Ma Cai" ,
   ]
  },
  {
    province: 'Lạng Sơn' ,
    district: ["Chọn Quận/Huyện", "Thành phố Lạng Sơn","Huyện Bắc Sơn","Huyện Bình Gia","Huyện Cao Lộc","Huyện Chi Lăng","Huyện Đình Lập","Huyện Hữu Lũng","Huyện Lộc Bình","Huyện Tràng Định","Huyện Văn Lãng","Huyện Văn Quan",
   ]
  },
  {
    province: 'Lâm Đồng' ,
    district: ["Chọn Quận/Huyện", "Thành phố Bảo Lộc","Thành phố Đà Lạt","Huyện Bảo Lâm","Huyện Cát Tiên","Huyện Đạ Huoai","Huyện Đạ Tẻh","Huyện Đam Rông","Huyện Di Linh","Huyện Đơn Dương","Huyện Đức Trọng","Huyện Lạc Dương","Huyện Lâm Hà",
   ]
  },
  {
    province: 'Long An' ,
    district: ["Chọn Quận/Huyện", "Thành phố Tân An","Thị xã Kiến Tường","Huyện Bến Lức","Huyện Cần Đước","Huyện Cần Giuộc","Huyện Châu Thành","Huyện Đức Hòa","Huyện Đức Huệ","Huyện Mộc Hóa","Huyện Tân Hưng","Huyện Tân Thạnh","Huyện Tân Trụ","Huyện Thạnh Hóa","Huyện Thủ Thừa","Huyện Vĩnh Hưng",
   ]
  },
  {
    province: 'Nam Định' ,
    district: ["Chọn Quận/Huyện","Thành phố Nam Định","Huyện Giao Thủy","Huyện Hải Hậu","Huyện Mỹ Lộc","Huyện Nam Trực","Huyện Nghĩa Hưng","Huyện Trực Ninh","Huyện Vụ Bản","Huyện Xuân Trường","Huyện Ý Yên" ,
   ]
  },
  {
    province: 'Nghệ An' ,
    district: ["Chọn Quận/Huyện","Thành phố Vinh","Thị xã Cửa Lò","Thị xã Hoàng Mai","Thị xã Thái Hòa","Huyện Anh Sơn","Huyện Con Cuông","Huyện Diễn Châu","Huyện Đô Lương","Huyện Hưng Nguyên","Huyện Kỳ Sơn","Huyện Nam Đàn","Huyện Nghi Lộc","Huyện Nghĩa Đàn","Huyện Quế Phong","Huyện Quỳ Châu","Huyện Quỳ Hợp","Huyện Quỳnh Lưu","Huyện Tân Kỳ","Huyện Thanh Chương","Huyện Tương Dương","Huyện Yên Thành" ,
   ]
  },
  {
    province: 'Ninh Bình' ,
    district: ["Chọn Quận/Huyện", "Thành phố Ninh Bình","Thị xã Tam Điệp","Huyện Gia Viễn","Huyện Hoa Lư","Huyện Kim Sơn","Huyện Nho Quan","Huyện Yên Khánh","Huyện Yên Mô",
   ]
  },
  {
    province: 'Ninh Thuận' ,
    district: ["Chọn Quận/Huyện", "Thành phố Phan Rang - Tháp Chàm","Huyện Bác Ái","Huyện Ninh Hải","Huyện Ninh Phước","Huyện Ninh Sơn","Huyện Thuận Bắc","Huyện Thuận Nam",
   ]
  },
  {
    province: 'Phú Thọ' ,
    district: ["Chọn Quận/Huyện","Thành phố Việt Trì","Thị xã Phú Thọ","Huyện Cẩm Khê","Huyện Đoan Hùng","Huyện Hạ Hòa","Huyện Lâm Thao","Huyện Phù Ninh","Huyện Tam Nông","Huyện Tân Sơn","Huyện Thanh Ba","Huyện Thanh Sơn","Huyện Thanh Thủy","Huyện Yên Lập" ,
   ]
  },
  {
    province: 'Phú Yên' ,
    district: [ "Chọn Quận/Huyện","Thành phố Tuy Hòa","Thị xã Sông Cầu","Huyện Đông Hòa","Huyện Đồng Xuân","Huyện Phú Hòa","Huyện Sơn Hòa","Huyện Sông Hinh","Huyện Tây Hòa","Huyện Tuy An",
   ]
  },
  {
    province: 'Quảng Bình' ,
    district: ["Chọn Quận/Huyện", "Thành phố Đồng Hới","Thị xã Ba Đồn","Huyện Bố Trạch","Huyện Lệ Thủy","Huyện Minh Hóa","Huyện Quảng Ninh","Huyện Quảng Trạch","Huyện Tuyên Hóa",
   ]
  },
  {
    province: 'Quảng Nam' ,
    district: ["Chọn Quận/Huyện", "Thành phố Hội An","Thành phố Tam Kỳ","Huyện Bắc Trà My","Huyện Đại Lộc","Huyện Điện Bàn","Huyện Đông Giang","Huyện Duy Xuyên","Huyện Hiệp Đức","Huyện Nam Giang","Huyện Nam Trà My","Huyện Nông Sơn","Huyện Núi Thành","Huyện Phú Ninh","Huyện Phước Sơn","Huyện Quế Sơn","Huyện Tây Giang","Huyện Thăng Bình","Huyện Tiên Phước",
   ]
  },
  {
    province: 'Quảng Ngãi' ,
    district: ["Chọn Quận/Huyện", "Thành phố Quảng Ngãi","Huyện Ba Tơ","Huyện Bình Sơn","Huyện Đức Phổ","Huyện Lý Sơn","Huyện Minh Long","Huyện Mộ Đức","Huyện Nghĩa Hành","Huyện Sơn Hà","Huyện Sơn Tây","Huyện Sơn Tịnh","Huyện Tây Trà","Huyện Trà Bồng","Huyện Tư Nghĩa",
   ]
  },
  {
    province: 'Quảng Ninh' ,
    district: ["Chọn Quận/Huyện", "Thành phố Hạ Long","Thành phố Móng Cái","Thị xã Cẩm Phả","Thị xã Uông Bí","Huyện Ba Chẽ","Huyện Bình Liêu","Huyện Cô Tô","Huyện Đầm Hà","Huyện Đông Triều","Huyện Hải Hà","Huyện Hoành Bồ","Huyện Quảng Yên","Huyện Tiên Yên","Huyện Vân Đồn",
   ]
  },
  {
    province: 'Quảng Trị' ,
    district: ["Chọn Quận/Huyện", "Thành phố Đông Hà","Thị xã Quảng Trị","Huyện Cam Lộ","Huyện Cồn Cỏ","Huyện Đăk Rông","Huyện Đảo Cồn Cỏ","Huyện Gio Linh","Huyện Hải Lăng","Huyện Hướng Hóa","Huyện Triệu Phong","Huyện Vĩnh Linh",
   ]
  },
  {
    province: 'Sóc Trăng' ,
    district: [ "Chọn Quận/Huyện","Thành phố Sóc Trăng","Huyện Châu Thành","Huyện Cù Lao Dung","Huyện Kế Sách","Huyện Long Phú","Huyện Mỹ Tú","Huyện Mỹ Xuyên","Huyện Ngã Năm","Huyện Thạnh Trị","Huyện Trần Đề","Huyện Vĩnh Châu",
   ]
  },
  {
    province: 'Sơn La' ,
    district: ["Chọn Quận/Huyện", "Thành phố Sơn La","Huyện Bắc Yên","Huyện Mai Sơn","Huyện Mộc Châu","Huyện Mường La","Huyện Phù Yên","Huyện Quỳnh Nhai","Huyện Sông Mã","Huyện Sốp Cộp","Huyện Thuận Châu","Huyện Vân Hồ","Huyện Yên Châu",
   ]
  },
  {
    province: 'Tây Ninh' ,
    district: ["Chọn Quận/Huyện", "Thành phố Tây Ninh","Huyện Bến Cầu","Huyện Châu Thành","Huyện Dương Minh Châu","Huyện Gò Dầu","Huyện Hòa Thành","Huyện Tân Biên","Huyện Tân Châu","Huyện Trảng Bàng",
   ]
  },
  {
    province: 'Thái Bình' ,
    district: ["Chọn Quận/Huyện", "Thành phố Thái Bình","Huyện Đông Hưng","Huyện Hưng Hà","Huyện Kiến Xương","Huyện Quỳnh Phụ","Huyện Thái Thuỵ","Huyện Tiền Hải","Huyện Vũ Thư",
   ]
  },
  {
    province: 'Thái Nguyên' ,
    district: ["Chọn Quận/Huyện", "Thành phố Thái Nguyên","Thị xã Sông Công","Huyện Đại Từ","Huyện Định Hóa","Huyện Đồng Hỷ","Huyện Phổ Yên","Huyện Phú Bình","Huyện Phú Lương","Huyện Võ Nhai",
   ]
  },
  {
    province: 'Thanh Hóa' ,
    district: ["Chọn Quận/Huyện", "Thành phố Thanh Hóa","Thị xã Bỉm Sơn","Thị xã Sầm Sơn","Huyện Bá Thước","Huyện Cẩm Thủy","Huyện Đông Sơn","Huyện Hà Trung","Huyện Hậu Lộc","Huyện Hoằng Hóa","Huyện Lang Chánh","Huyện Mường Lát","Huyện Nga Sơn","Huyện Ngọc Lặc","Huyện Như Thanh","Huyện Như Xuân","Huyện Nông Cống","Huyện Quan Hóa","Huyện Quan Sơn","Huyện Quảng Xương","Huyện Thạch Thành","Huyện Thiệu Hóa","Huyện Thọ Xuân","Huyện Thường Xuân","Huyện Tĩnh Gia","Huyện Triệu Sơn","Huyện Vĩnh Lộc","Huyện Yên Định",
   ]
  },
  {
    province: 'Thừa Thiên - Huế' ,
    district: ["Chọn Quận/Huyện", "Thành phố Huế","Thị xã Hương Thủy","Huyện A Lưới","Huyện Nam Đông","Huyện Phong Điền","Huyện Phú Lộc","Huyện Phú Vang","Huyện Quảng Điền",
   ]
  },
  {
    province: 'Tiền Giang' ,
    district: [ "Chọn Quận/Huyện","Thành phố Mỹ Tho","Thị xã Gò Công","Thị xã Cai Lậy","Huyện Cái Bè","Huyện Châu Thành","Huyện Chợ Gạo","Huyện Gò Công Đông","Huyện Gò Công Tây","Huyện Tân Phú Đông","Huyện Tân Phước",
   ]
  },
  {
    province: 'Trà Vinh' ,
    district: ["Chọn Quận/Huyện", "Thành phố Trà Vinh","Huyện Càng Long","Huyện Cầu Kè","Huyện Cầu Ngang","Huyện Châu Thành","Huyện Duyên Hải","Huyện Tiểu Cần","Huyện Trà Cú",
   ]
  },
  {
    province: 'Tuyên Quang' ,
    district: ["Chọn Quận/Huyện", "Thành phố Tuyên Quang","Huyện Chiêm Hóa","Huyện Hàm Yên","Huyện Lâm Bình","Huyện Na Hang","Huyện Sơn Dương","Huyện Yên Sơn",
   ]
  },
  {
    province: 'Vĩnh Long' ,
    district: ["Chọn Quận/Huyện", "Thành phố Vĩnh Long","Quận Bình Tân","Huyện Bình Minh","Huyện Long Hồ","Huyện Mang Thít","Huyện Tam Bình","Huyện Trà Ôn","Huyện Vũng Liêm",
   ]
  },
  {
    province: 'Vĩnh Phúc' ,
    district: [ "Chọn Quận/Huyện","Thành phố Vĩnh Yên","Thị xã Phúc Yên","Huyện Bình Xuyên","Huyện Lập Thạch","Huyện Sông Lô","Huyện Tam Đảo","Huyện Tam Dương","Huyện Vĩnh Tường","Huyện Yên Lạc",
   ]
  },
  {
    province: 'Yên Bái' ,
    district: ["Chọn Quận/Huyện","Thành phố Yên Bái","Thị xã Nghĩa Lộ","Huyện Lục Yên","Huyện Mù Cang Chải","Huyện Trạm Tấu","Huyện Trấn Yên","Huyện Văn Chấn","Huyện Văn Yên","Huyện Yên Bình" ,
   ]
  },
]


activeContent = 'content1';
  showContent(content: string): void {
    if (this.fullname !== '' && this.phoneNumberCheckResult ==true && this.address !== ''&& this.selectedProvince !== null && this.selectedDistrict !== null
       ) {
          this.activeContent = content;
      } else {
        alert("Bạn cần nhập đủ và đúng thông tin bắt buộc !")
      }
  }


public ngOnInit(): void{
  console.log('VietNamdata =', this.VietNamdata)


  if (this.selectedProvince === 'Thành phố Hồ Chí Minh') {
      this.selectedOption = 'Giao hàng trong tỉnh'
      return;
    }
    else {
      this.selectedOption = 'Giao hàng ngoài tỉnh'
      return;
    }
}

public changeProvince(event: any){
  this.selectedProvince = event.target.value;


  const province = event.target.value;
if(!province){
  return;
}
this.districts = this.VietNamdata.find((data) => data.province === province)?.district || [];
}
public changeDistrict(event: any){
  this.selectedDistrict = event.target.value;
}


//validate
FormControl = new FormControl('', [Validators.required]);
matcher = new MyErrorStateMatcher();


isPhoneNumberValid(phoneNumber: string): boolean {
  if (phoneNumber.length !== 10) {
    return false;
  }
  const phoneNumberRegex = /^(03|05|08|09)\d{8}$/;
  if (!phoneNumberRegex.test(phoneNumber)) {
    return false;
  }
  return true;
}
updatePhoneNumber(): void {
  if (this.isPhoneNumberValid(this.phone)) {
    this.phoneNumberCheckResult = true;
  } else {
    this.phoneNumberCheckResult = false;
  }
}

public showText() {
  const messageElem = document.getElementById("message");
  const price = this.selectedPrice === 'Giao hàng trong tỉnh' ? '20000' : '40000';
  if (messageElem) {
    messageElem.innerHTML = this.selectedPrice;
  }
}

  public changePay(event: any){
    this.selectedPay = event.target.value;
  }
  showPay(event: any) {
    const messageElem = document.getElementById("message");
    if (messageElem) {
      if (event.target.value === "Thanh toán khi nhận hàng (COD)") {
        messageElem.innerHTML = "Thanh toán khi nhận hàng (COD)";
      } else if (event.target.value === "Chuyển khoản qua ngân hàng") {
        messageElem.innerHTML = "Chuyển khoản qua ngân hàng";
      }
      else if (event.target.value === "Ví điện tử") {
        messageElem.innerHTML = "Ví điện tử";
      }
    }
  }


  get totalShip(): number {
    if (this.selectedProvince === null) {
      return 0;
    }
   else if (this.selectedProvince === 'Thành phố Hồ Chí Minh') {
      return 20000;
    }
    else {
      return 40000;
    }
  }


  get tong(): number {
    return this.totalShip + this.contemporaryTotalPay + this.pay;
  }


}
