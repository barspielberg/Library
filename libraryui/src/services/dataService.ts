import axios, { AxiosResponse } from "axios";
import Book from "../models/Book";
import type BookType from "../models/BookType";
import type IBookData from "../models/IBookData";

axios.defaults.baseURL = "https://localhost:44381/api/";

export const getBooks = (type: BookType): Promise<Book[]> => {
  return new Promise((res, rej) => {
    axios
      .get<IBookData[]>("/" + gteStringType(type))
      .then((r) => res(r.data.map((d) => bookDataToBook(d, type))));
  });
};

export const postBook = (
  type: BookType,
  bookData: IBookData
): Promise<Book> => {
  return new Promise((res, rej) => {
    axios
      .post<IBookData>("/" + gteStringType(type), bookData)
      .then((r) => res(bookDataToBook(r.data, type)));
  });
};

export const putBook = (type: BookType, bookData: IBookData): Promise<Book> => {
  return new Promise((res, rej) => {
    axios
      .put<IBookData>("/" + gteStringType(type) + "/" + bookData.id, bookData)
      .then((r) => res(bookDataToBook(r.data, type)));
  });
};

export const deleteBooks = (
  type: BookType,
  ids: string[]
): Promise<AxiosResponse<any>> =>
  axios.delete("/" + gteStringType(type), { data: ids });

const gteStringType = (type: BookType): string => {
  switch (type) {
    case BookType.Magazine:
      return "Magazines";
    case BookType.Novel:
      return "Novels";
    case BookType.StudyBook:
      return "StudyBooks";
    default:
      return "";
  }
};

export const bookDataToBook = (data: IBookData, type: BookType): Book => {
  return new Book(
    data.id,
    data.title,
    data.author,
    new Date(data.publishDate),
    data.price,
    data.inStock,
    data.discount,
    type
  );
};
