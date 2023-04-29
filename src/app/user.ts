import { Cart } from "./cart";

export class User {
  constructor(
    public _id:any=null,
    public username:string="",
    public password:string="",
    public name: string="",
    public email:string="",
    public dob:Date,
    public phoneNumber: number,
    public gender:string="",
    public Img:string="",
    public cDate:Date,
    public cart:Cart []=[],
    public order:string[] =[],
    public discount:string[] =[],
    public Address:string []=[]
  ){}
}


