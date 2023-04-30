export class Address {
  constructor(
    public _id:any=null,
    public Receiver_name: string="",
    public Receiver_phoneNumber: number=0,
    public addressDetail:string="",
    public district:string="",
    public city :string="",
    public IsDefault:boolean=false,
    public cDate:Date,
  ){}
}


