import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Book from "../../models/Book";
import BookType from "../../models/BookType";
import { clearAll, getBooksAsync } from "../../redux/actions/booksActions";
import { RootState } from "../../redux/reducers/mainReducer";
import BookCard from "../UIComponents/BookCard";

const useStyles = makeStyles({
  root: {
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

  useEffect(() => {
    clearBooks();
    getBooks(BookType.Magazine);
    getBooks(BookType.Novel);
    getBooks(BookType.StudyBook);
  }, [clearBooks, getBooks]);

  return (
    <div className={classes.root}>
      {books.map((b) => (
        <BookCard key={b.id} book={b} />
      ))}
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
