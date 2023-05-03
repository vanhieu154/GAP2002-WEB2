export class Cart {
  constructor(
    public cartItems: CartItem[] = []
  ) {}
}
export class CartItem {
  constructor(
    public productID: string,
    public quantity: number
  ) {}
}
