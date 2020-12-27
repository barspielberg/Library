import Book from "../../models/Book";
import { cartActionTypes } from "../actions/cartActions";

const initialState: Book[] = [];

const cartReducer = (state = initialState, action: cartActionTypes) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.book];
    case "REMOVE_FROM_CART":
      return state.filter((b) => b.id !== action.book.id);
    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export default cartReducer;
