import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Book from "../../models/Book";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { CardMedia } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  type: {
    fontSize: 14,
  },
  author: {
    marginBottom: 12,
    marginInlineStart: "0.5rem",
    fontSize: 14,
  },
  price: {
    direction: "rtl",
  },
  media: {
    height: 0,
    paddingTop: "100%",
  },
});

interface IBookCardProps {
  book: Book;
}

const BookCard: React.FC<IBookCardProps> = ({ book }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
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
        <CardMedia
          className={classes.media}
          image="https://assets.theickabog.com/wp-content/uploads/2020/07/Ickabog_Homepage_Hero_US.jpg"
          title={book.title}
        />
        <Typography className={classes.price} color="textSecondary">
          price: {book.price}$
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <AddShoppingCartIcon />
          add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookCard;
