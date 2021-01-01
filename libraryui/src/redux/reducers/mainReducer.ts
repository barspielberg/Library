import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import cartReducer from "./cartReducer";

export const rootReducer = combineReducers({
  books: booksReducer,
  cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
