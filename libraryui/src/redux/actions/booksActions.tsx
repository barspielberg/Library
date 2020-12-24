import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import Book from "../../models/Book";
import BookType from "../../models/BookType";
import IBookData from "../../models/IBookData";
import * as DataService from "../../services/dataService";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  Book[],
  unknown,
  Action<string>
>;

export const ADD_BOOK = "ADD_BOOK";
export const ADD_BOOKS = "ADD_BOOKS";
export const CLEAR_ALL_BOOKS = "CLEAR_ALL_BOOKS";

interface AddBookAction {
  type: typeof ADD_BOOK;
  book: Book;
}
interface AddBooksAction {
  type: typeof ADD_BOOKS;
  books: Book[];
}
interface ClearAllBooks {
  type: typeof CLEAR_ALL_BOOKS;
}
export type BookActionTypes = AddBookAction | AddBooksAction | ClearAllBooks;

const addBook = (book: Book): BookActionTypes => ({
  type: ADD_BOOK,
  book,
});
const addBooks = (books: Book[]): BookActionTypes => ({
  type: ADD_BOOKS,
  books,
});

export const clearAll = (): BookActionTypes => ({ type: CLEAR_ALL_BOOKS });

export const postBookAsync = (
  bookType: BookType,
  bookData: IBookData
): AppThunk => (dispatch) => {
  DataService.postBook(bookType, bookData).then((b) => dispatch(addBook(b)));
};

export const getBooksAsync = (type: BookType): AppThunk => (dispatch) => {
  DataService.getBooks(type).then((b) => dispatch(addBooks(b)));
};
