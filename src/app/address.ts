export class Address {
  constructor(
    public _id:any=null,
    public hovaten:string="",
    public phonenumber:number=0,
    public district:string="",
    public city :string="",
    public ward:string="",
    public diachicuthe:string="",
    public addressType:string="",
    public IsDefault:boolean=false,
    public cDate:Date=new Date(),
  ){}
}


