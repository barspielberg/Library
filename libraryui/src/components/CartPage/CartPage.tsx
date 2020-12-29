import React from "react";
import { connect } from "react-redux";
import CartItem from "../../models/CartItem";
import { RootState } from "../../redux/reducers/mainReducer";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BookCardHead from "../UIComponents/BookCardHead";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Button,
  CardActions,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { changeAmount, removeFromCart } from "../../redux/actions/cartActions";

const useStyles = makeStyles({
  container: {
    maxWidth: 900,
    margin: "auto",
    marginTop: "1rem",
  },
  actions: {
    flexDirection: "row-reverse",
  },
  delCell: {
    width: 10,
    padding: 0,
  },
  deleteBtn: {
    color: red[400],
  },
});
interface ICartPageProps {
  items: CartItem[];
  removeItem: (i: CartItem) => void;
  changeAmount: (i: CartItem, a: number) => void;
}

const CartPage: React.FC<ICartPageProps> = ({
  items,
  removeItem,
  changeAmount,
}) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.delCell}></TableCell>
            <TableCell>Book</TableCell>
            <TableCell align="center">Price (per unit)</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="right">Sum ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell className={classes.delCell}>
                <IconButton
                  aria-label="delete"
                  className={classes.deleteBtn}
                  onClick={() => removeItem(item)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <BookCardHead book={item.book} />
              </TableCell>
              <TableCell align="center">{item.book.price} $</TableCell>
              <TableCell align="center">
                <TextField
                  type="number"
                  onChange={(e) => changeAmount(item, +e.target.value)}
                  value={item.amount}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">X</InputAdornment>
                    ),
                  }}
                />
              </TableCell>
              <TableCell align="right">
                = {item.amount * item.book.price} $
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="center">
              {items.reduce((pre, i) => pre + i.amount, 0)} items
            </TableCell>
            <TableCell align="right">
              Total ={" "}
              {items.reduce((pre, i) => pre + i.amount * i.book.price, 0)}$
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CardActions className={classes.actions}>
        <Button
          disabled={items.length <= 0}
          variant="contained"
          color="secondary"
        >
          buy now!
        </Button>
      </CardActions>
    </TableContainer>
  );
};

const mapState2Props = (state: RootState) => ({
  items: state.cart,
});
const mapDispatch2Props = {
  removeItem: (i: CartItem) => removeFromCart(i.book),
  changeAmount: (i: CartItem, a: number) => changeAmount(i, a),
};
export default connect(mapState2Props, mapDispatch2Props)(CartPage);
