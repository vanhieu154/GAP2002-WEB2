import { Cart } from "./cart";

export class User {
  constructor(
    public _id:any=null,
    public username:string="",
    public passwword:string="",
    public firstName:string="",
    public lastName:string="",
    public email:string="",
    public dateOfBirth:Date,
    public Img:string="",
    public cDate:Date,
    public order:string[] =[],
    public discount:string[] =[],
    public cart:Cart []=[],
  ){}
}


