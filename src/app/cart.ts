export class Cart {
  constructor(
    public cartItems: CartItem[] = [],
    public total: number = 0,
    public cDate: Date = new Date()
  ) {}
}
export class CartItem {
  constructor(
    public productID: string,
    public qty: number
  ) {}
}
