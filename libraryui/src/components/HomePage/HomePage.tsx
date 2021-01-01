import { makeStyles } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import Book from "../../models/Book";
import BookType from "../../models/BookType";
import { clearAll, getBooksAsync } from "../../redux/actions/booksActions";
import { RootState } from "../../redux/reducers/mainReducer";
import BookCard from "../UIComponents/BookCard";
import SelectBookType from "../UIComponents/SelectBookType";

const useStyles = makeStyles({
  selectBox: {
    position: "absolute",
    padding: "0.3rem",
    right: 0,
  },
  grid: {
    display: "grid",
    justifyContent: "center",
    gridTemplateColumns: "repeat(auto-fill, 18rem)",
    gridGap: "0.5rem",
    padding: "0.5rem",
  },
});

interface props {
  books: Book[];
  getBooks: (type: BookType) => void;
  clearBooks: () => void;
}

const HomePage: React.FC<props> = ({ books, getBooks, clearBooks }) => {
  const classes = useStyles();
  const [filterdBooks, setFilterdBooks] = useState(books);
  const [type, setType] = useState<BookType>();

  const handelTypeChange = (type: BookType | undefined) => {
    setType(type);
    filterBooks(type);
  };
  const filterBooks = useCallback(
    (type: BookType | undefined) => {
      if (!type) setFilterdBooks(books);
      else {
        setFilterdBooks(books.filter((b) => b.type === type));
      }
    },
    [setFilterdBooks, books]
  );

  useEffect(() => {
    clearBooks();
    getBooks(BookType.Magazine);
    getBooks(BookType.Novel);
    getBooks(BookType.StudyBook);
  }, [clearBooks, getBooks]);

  useEffect(() => filterBooks(type), [books, filterBooks, type]);

  return (
    <div>
      <div className={classes.selectBox}>
        <SelectBookType value={type} onChange={handelTypeChange} />
      </div>
      <div className={classes.grid}>
        {filterdBooks.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </div>
  );
};

const mapState2Props = (state: RootState) => ({
  books: state.books,
});
const mapDispatch2Props = {
  getBooks: (type: BookType) => getBooksAsync(type),
  clearBooks: () => clearAll(),
};

export default connect(mapState2Props, mapDispatch2Props)(HomePage);
