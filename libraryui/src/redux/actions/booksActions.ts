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

export type BookActionTypes =
  | {
      type: "ADD_BOOKS";
      books: Book[];
    }
  | {
      type: "UPDATE_BOOK";
      book: Book;
    }
  | {
      type: "CLEAR_ALL_BOOKS";
    }
  | {
      type: "DELETE_BOOKS";
      ids: string[];
    };

const addBooks = (books: Book[]): BookActionTypes => ({
  type: "ADD_BOOKS",
  books,
});

const updateBook = (book: Book): BookActionTypes => ({
  type: "UPDATE_BOOK",
  book,
});

const deleteBooks = (ids: string[]): BookActionTypes => ({
  type: "DELETE_BOOKS",
  ids,
});

export const clearAll = (): BookActionTypes => ({ type: "CLEAR_ALL_BOOKS" });

export const postBookAsync = (
  bookType: BookType,
  bookData: IBookData
): AppThunk => (dispatch) => {
  DataService.postBook(bookType, bookData).then((b) => b && dispatch(addBooks([b])));
};
export const putBookAsync = (
  bookType: BookType,
  bookData: IBookData
): AppThunk => (dispatch) => {
  DataService.putBook(bookType, bookData).then((b) => b && dispatch(updateBook(b)));
};

export const getBooksAsync = (type: BookType): AppThunk => (dispatch) => {
  DataService.getBooks(type).then((b) => dispatch(addBooks(b)));
};

export const deleteBooksAsnc = (ids: string[]): AppThunk => async (
  dispatch,
  getState
) => {
  const { books } = getState();
  const dictionary: { [type in BookType]: string[] } = {
    Magazine: [],
    Novel: [],
    "Study Book": [],
  };

  for (const id of ids) {
    const t = books.find((b) => b.id === id)?.type;
    if (t) dictionary[t].push(id);
  }

  for (const key in dictionary) {
    const type = key as BookType;
    const ids = dictionary[type];
    if (ids.length > 0) await DataService.deleteBooks(type, ids);
  }
  dispatch(deleteBooks(ids));
};
