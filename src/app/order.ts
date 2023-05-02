export class Order {
  constructor(
    public _id: any = null,
    public userId:string="",
    public orderItems: OrderItem[] = [],
    public discountID: string ="",
    public total: number = 0,
    public cDate: Date = new Date()
  ) {}
}
export class OrderItem {
  constructor(
    public productID: string,
    public qty: number
  ) {}
}
