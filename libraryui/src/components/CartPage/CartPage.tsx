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

const useStyles = makeStyles({
  container: {
    maxWidth: 900,
    margin: "auto",
    marginTop: "1rem",
  },
});
interface ICartPageProps {
  items: CartItem[];
}

const CartPage: React.FC<ICartPageProps> = ({ items }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Book</TableCell>
            <TableCell align="center">Price (per unit)</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="right">Sum ($)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                <BookCardHead book={item.book} />
              </TableCell>
              <TableCell align="center">{item.book.price} $</TableCell>
              <TableCell align="center">X {item.amount}</TableCell>
              <TableCell align="right">
                = {item.amount * item.book.price} $
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
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
    </TableContainer>
  );
};

const mapState2Props = (state: RootState) => ({
  items: state.cart,
});
const mapDispatch2Props = {};
export default connect(mapState2Props, mapDispatch2Props)(CartPage);
