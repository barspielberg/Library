import axios, { AxiosResponse } from "axios";
import Book from "../models/Book";
import type BookType from "../models/BookType";
import type IBookData from "../models/IBookData";

axios.defaults.baseURL = "https://localhost:44381/api/";

export const getBooks = async (type: BookType): Promise<Book[]> => {
  try {
		const fetched = await axios.get<IBookData[]>(`/${getStringType(type)}`);
		return fetched.data.map(d => bookDataToBook(d, type));
	} catch (e) {
		return [];
	}
};

export const postBook = async (
	type: BookType,
	bookData: IBookData
): Promise<Book | undefined> => {
	try {
		const fetched = await axios.post<IBookData>(
			`/${getStringType(type)}`,
			bookData
		);
		return bookDataToBook(fetched.data, type);
	} catch (e) {
		return undefined;
	}
};

export const putBook = async (
	type: BookType,
	bookData: IBookData
): Promise<Book | undefined> => {
	try {
		const res = await axios.put(
			`/${getStringType(type)}/${bookData.id}`,
			bookData
		);
		return bookDataToBook(res.data, type);
	} catch (e) {
		return undefined;
	}
};
export const deleteBooks = (
  type: BookType,
  ids: string[]
): Promise<AxiosResponse<any>> =>
  axios.delete(`/${getStringType(type)}`, { data: ids });

const getStringType = (type: BookType): string => {
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
