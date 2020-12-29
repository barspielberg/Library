import CartItem from "../../models/CartItem";
import { cartActionTypes } from "../actions/cartActions";

const initialState: CartItem[] = [];

const cartReducer = (
  state = initialState,
  action: cartActionTypes
): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART":
      const addItem = state.find((i) => i.book.id === action.book.id);
      if (addItem) {
        return [
          ...state.filter((i) => i.book.id !== action.book.id),
          { ...addItem, amount: addItem.amount + 1 },
        ];
      }
      return [...state, new CartItem(action.book)];
    case "CHANGE_AMOUNT":
      return state.map((item) =>
        item.book.id === action.item.book.id
          ? { ...item, amount: action.amount }
          : item
      );
    case "REMOVE_FROM_CART":
      return state.filter((b) => b.book.id !== action.book.id);
    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export default cartReducer;
