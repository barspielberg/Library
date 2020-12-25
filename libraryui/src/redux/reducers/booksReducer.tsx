import Book from "../../models/Book";
import { BookActionTypes } from "../actions/booksActions";

const initialState: Book[] = [];

const booksReducer = (state = initialState, action: BookActionTypes) => {
  switch (action.type) {
    case "ADD_BOOKS":
      return [...state, ...action.books];
    case "UPDATE_BOOK":
      return state.map((b) => (action.book.id === b.id ? action.book : b));
    case "CLEAR_ALL_BOOKS":
      return [];
    default:
      return state;
  }
};

export default booksReducer;
