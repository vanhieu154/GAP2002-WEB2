
export class Promotion {
  constructor(
  public _id:any=null,
  public TenPromotion: string="",
  public LoaiPromotion: string="",
  public Mota: string[]=[],
  public Gia: number=0,
  public SanphamApdung: string[]=[],
  public Ngaybatdau: string="",
  public Ngayketthuc: string="",
  public cDate:Date=new Date()){}
}

