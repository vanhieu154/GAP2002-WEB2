export class Coupon{
  constructor(
  public _id:any=null,
  public MaCoupon:string="",
  public TenCoupon:string="",
  public Hinhanh: string[] =[],
  public Soluong:number=0,
  public Giatrigiam:number=0,
  public Noidung:string="",
  public Ngaybatdau:string="",
  public Ngayketthuc:string="",
  public cDate:Date=new Date()){}
  }
