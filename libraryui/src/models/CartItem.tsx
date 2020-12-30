import Book from "./Book";

class CartItem {
  constructor(public book: Book, public amount: number = 1) {}

  getPrice() {
    return this.amount * this.book.getPrice();
  }
}

export default CartItem;
