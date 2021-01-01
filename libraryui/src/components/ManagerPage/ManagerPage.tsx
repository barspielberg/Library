import React, { CSSProperties, useEffect, useState } from "react";
import DataTable from "./DataTable/DataTable";
import EditBook from "./EditBook/EditBook";
import Book from "../../models/Book";
import BookCard from "../UIComponents/BookCard";
import IBookData from "../../models/IBookData";
import { bookDataToBook } from "../../services/dataService";

const ManagerPage: React.FC = () => {
  const [selected, select] = useState<Book>(new Book());

  const [type, setType] = useState(selected.type);
  const [bookData, setBookData] = useState<IBookData>({
    id: selected.id.toString() || undefined,
    title: selected.title,
    author: selected.author,
    price: selected.price,
    publishDate: selected.publishDate,
    inStock: selected.inStock,
    discount: selected.discount,
  });

  useEffect(() => {
    setBookData({
      id: selected.id.toString() || undefined,
      title: selected.title,
      author: selected.author,
      price: selected.price,
      publishDate: selected.publishDate,
      inStock: selected.inStock,
      discount: selected.discount,
    });
    setType(selected.type);
  }, [setBookData, setType, selected]);
  return (
    <div>
      <div style={styles}>
        <BookCard book={bookDataToBook(bookData, type)} />
        <EditBook
          select={select}
          bookData={bookData}
          type={type}
          setType={setType}
          setBookData={setBookData}
        />
      </div>
      <DataTable select={select} />
    </div>
  );
};
//TODO add discount to many
export default ManagerPage;

const styles: CSSProperties = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  marginTop: "1rem",
};
