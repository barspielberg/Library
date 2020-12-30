import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Book from "../../models/Book";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { CardMedia } from "@material-ui/core";
import BookType from "../../models/BookType";
import { connect } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import BookCardHead from "./BookCardHead";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  date: {
    marginBottom: 12,
    fontSize: 14,
  },
  price: {
    direction: "rtl",
  },
  media: {
    height: "20rem",
  },
});

const getImage = (type: BookType) => {
  switch (type) {
    case BookType.Magazine:
      return "https://img.timeinc.net/time/images/covers/europe/2013/20131028_600.jpg";
    case BookType.StudyBook:
      return "https://www.pearsonhighered.com/assets/bigcovers/0/3/2/1/032151307X.jpg";
    case BookType.Novel:
      return "https://assets.theickabog.com/wp-content/uploads/2020/07/Ickabog_Homepage_Hero_US.jpg";

    default:
      return "";
  }
};
//TODO discount bage and price
//TODO display uppercase first char

interface IBookCardProps {
  book: Book;
  addToCart: (book: Book) => void;
}

const BookCard: React.FC<IBookCardProps> = ({ book, addToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <BookCardHead book={book} />
        <CardMedia
          className={classes.media}
          image={getImage(book.type)}
          title={book.title}
        />
        <Typography className={classes.price} color="textSecondary">
          price:{" "}
          {book.discount ? (
            <span style={{ textDecoration: "line-through" }}>
              {book.price.toFixed(2)}$
            </span>
          ) : null}
          <span style={{ color: book.discount ? "#64b5f6" : "inherit" }}>
            {" "}
            {book.getPrice().toFixed(2)}$
          </span>
        </Typography>
        <Typography className={classes.date} color="textSecondary">
          Publish At: {book.publishDate.toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => addToCart(book)}
          disabled={book.inStock <= 0}
        >
          <AddShoppingCartIcon />
          {book.inStock > 0 ? "add to cart" : "out of stock"}
        </Button>
      </CardActions>
    </Card>
  );
};
const mapDispatch2Props = {
  addToCart: (book: Book) => addToCart(book),
};
export default connect(null, mapDispatch2Props)(BookCard);
