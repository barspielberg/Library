import axios from "axios";
import Book from "../models/Book";
import BookType from "../models/BookType";
import IBookData from "../models/IBookData";

axios.defaults.baseURL = "https://localhost:44381/api/";

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

export const getBooks = (type: BookType): Promise<Book[]> => {
  return new Promise((res, rej) => {
    axios
      .get<IBookData[]>("/" + gteStringType(type))
      .then((r) =>
        res(
          r.data.map(
            (d) =>
              new Book(
                d.id,
                d.title,
                d.author,
                new Date(d.publishDate),
                d.price,
                type
              )
          )
        )
      );
  });
};

export const postBook = (
  type: BookType,
  bookData: IBookData
): Promise<Book> => {
  return new Promise((res, rej) => {
    axios
      .post<IBookData>("/" + gteStringType(type), bookData)
      .then((r) =>
        res(
          new Book(
            r.data.id,
            r.data.title,
            r.data.author,
            new Date(r.data.publishDate),
            r.data.price,
            type
          )
        )
      );
  });
};
