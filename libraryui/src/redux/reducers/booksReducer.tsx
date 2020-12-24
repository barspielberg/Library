import Book from "../../models/Book";
import {
  ADD_BOOKS,
  BookActionTypes,
  CLEAR_ALL_BOOKS,
} from "../actions/booksActions";

const initialState: Book[] = [];

const booksReducer = (state = initialState, action: BookActionTypes) => {
  switch (action.type) {
    case ADD_BOOKS:
      return [...state, ...action.books];
    case CLEAR_ALL_BOOKS:
      return [];
    default:
      return state;
  }
};

export default booksReducer;
