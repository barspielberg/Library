import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import Book from "../../models/Book";
import BookType from "../../models/BookType";
import IBookData from "../../models/IBookData";
import * as DataService from "../../services/dataService";
import { RootState } from "../reducers/mainReducer";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const ADD_BOOKS = "ADD_BOOKS";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const CLEAR_ALL_BOOKS = "CLEAR_ALL_BOOKS";

interface AddBooksAction {
  type: typeof ADD_BOOKS;
  books: Book[];
}
interface UpdateBooksAction {
  type: typeof UPDATE_BOOK;
  book: Book;
}
interface ClearAllBooks {
  type: typeof CLEAR_ALL_BOOKS;
}
export type BookActionTypes =
  | AddBooksAction
  | UpdateBooksAction
  | ClearAllBooks;

const addBooks = (books: Book[]): BookActionTypes => ({
  type: ADD_BOOKS,
  books,
});

const updateBook = (book: Book): BookActionTypes => ({
  type: UPDATE_BOOK,
  book,
});

export const clearAll = (): BookActionTypes => ({ type: CLEAR_ALL_BOOKS });

export const postBookAsync = (
  bookType: BookType,
  bookData: IBookData
): AppThunk => (dispatch) => {
  DataService.postBook(bookType, bookData).then((b) => dispatch(addBooks([b])));
};
export const putBookAsync = (
  bookType: BookType,
  bookData: IBookData
): AppThunk => (dispatch) => {
  DataService.putBook(bookType, bookData).then((b) => dispatch(updateBook(b)));
};

export const getBooksAsync = (type: BookType): AppThunk => (dispatch) => {
  DataService.getBooks(type).then((b) => dispatch(addBooks(b)));
};
