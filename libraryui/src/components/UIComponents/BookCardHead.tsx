import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Book from "../../models/Book";
import BookmarkIcon from "@material-ui/icons/Bookmark";

const useStyles = makeStyles({
  type: {
    fontSize: 14,
  },
  author: {
    marginBottom: 12,
    fontSize: 14,
  },
});

interface IBookCardHeadProps {
  book: Book;
}

const BookCardHead: React.FC<IBookCardHeadProps> = ({ book }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography className={classes.type} color="textSecondary" gutterBottom>
        <BookmarkIcon fontSize="inherit" />
        {book.type}
      </Typography>
      <Typography variant="h5" component="h2">
        {book.title}
      </Typography>
      <Typography className={classes.author} color="textSecondary">
        by {book.author}
      </Typography>
    </React.Fragment>
  );
};

export default BookCardHead;
