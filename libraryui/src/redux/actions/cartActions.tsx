import Book from "../../models/Book";

export type cartActionTypes =
  | {
      type: "ADD_TO_CART";
      book: Book;
    }
  | {
      type: "SUBTRACT_FROM_CART";
      book: Book;
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
export const subtractFromCart = (book: Book): cartActionTypes => ({
  type: "SUBTRACT_FROM_CART",
  book,
});

export const removeFromCart = (book: Book): cartActionTypes => ({
  type: "REMOVE_FROM_CART",
  book,
});

export const clearCart = (): cartActionTypes => ({
  type: "CLEAR_CART",
});
