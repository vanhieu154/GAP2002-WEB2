export class Cart {
  constructor(
    public cartItems: CartItem[] = [],
    public cDate: Date = new Date()
  ) {}
}
export class CartItem {
  constructor(
    public productID: string,
    public quantity: number
  ) {}
}
