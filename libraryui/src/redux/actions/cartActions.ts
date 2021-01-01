import Book from "../../models/Book";
import CartItem from "../../models/CartItem";

export type cartActionTypes =
  | {
      type: "ADD_TO_CART";
      book: Book;
    }
  | {
      type: "CHANGE_AMOUNT";
      item: CartItem;
      amount: number;
    }
  | {
      type: "REMOVE_FROM_CART";
      book: Book;
    }
  | {
      type: "CLEAR_CART";
    };

export const addToCart = (book: Book): cartActionTypes => ({
  type: "ADD_TO_CART",
  book,
});

export const changeAmount = (
  item: CartItem,
  amount: number
): cartActionTypes => ({
  type: "CHANGE_AMOUNT",
  item,
  amount,
});

export const removeFromCart = (book: Book): cartActionTypes => ({
  type: "REMOVE_FROM_CART",
  book,
});

export const clearCart = (): cartActionTypes => ({
  type: "CLEAR_CART",
});
