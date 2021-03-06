import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
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

const useSearchQuery = () =>
  new URLSearchParams(useLocation().search).get("search");

interface props {
  books: Book[];
  getBooks: (type: BookType) => void;
  clearBooks: () => void;
}

const HomePage: React.FC<props> = ({ books, getBooks, clearBooks }) => {
  const classes = useStyles();
  const [filterdByType, setFilterdByType] = useState(books);
  const [filterdBooks, setFilterdBooks] = useState(books);
  const query = useSearchQuery();

  useEffect(() => {
    if (query)
      setFilterdBooks(
        filterdByType.filter(
          (b) => b.title.includes(query) || b.author.includes(query)
        )
      );
    else setFilterdBooks(filterdByType);
  }, [query, filterdByType, setFilterdBooks]);

  useEffect(() => {
    clearBooks();
    getBooks(BookType.Magazine);
    getBooks(BookType.Novel);
    getBooks(BookType.StudyBook);
  }, [clearBooks, getBooks]);

  return (
    <div>
      <div className={classes.selectBox}>
        <SelectBookType books={books} onFilterChanged={setFilterdByType} />
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
