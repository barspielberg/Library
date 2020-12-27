import Book from "./Book";

class CartItem {
  public amount: number = 1;
  constructor(public book: Book) {}
}

export default CartItem;
