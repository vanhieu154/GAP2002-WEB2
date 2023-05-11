import { Cart } from "./cart";

  export class User {
    constructor(
      public _id:any=null,
      public username:string="",
      public password:string="",
      public name: string="",
      public email:string="",
      public dob:Date=new Date(),
      public phoneNumber: number=0,
      public gender:string="",
      public Img:string="",
      public cDate:Date=new Date(),
      public cart:Cart []=[],
      public order:string[] =[],
      public discount:Discount[] =[],
      public Address:string []=[]
    ){}
  }


export class Discount{
  constructor(
    public DiscountID:any=null,
    public IsActive:boolean=true
  ){}
}
