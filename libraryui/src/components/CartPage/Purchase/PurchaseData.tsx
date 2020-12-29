import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CartItem from "../../../models/CartItem";
import BookCardHead from "../../UIComponents/BookCardHead";
import { Button, CardActions } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    maxWidth: 900,
    margin: "auto",
    marginTop: "1rem",
    position: "relative",
    left: "-50%",
    zIndex: 100,
  },
  actions: {
    flexDirection: "row-reverse",
  },
});

interface IPurchaseDataProps {
  items: CartItem[];
}

const PurchaseData: React.FC<IPurchaseDataProps> = ({ items }) => {
  const classes = useStyles();
  const tableRef = useRef<HTMLElement>();
  useEffect(() => tableRef.current?.scrollIntoView({ behavior: "smooth" }), []);

  return (
    <TableContainer
      component={Paper}
      className={classes.container}
      ref={tableRef}
    >
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
              <TableCell>
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
      <CardActions className={classes.actions}>
        <Button variant="contained" color="secondary">
          confirm
        </Button>
      </CardActions>
    </TableContainer>
  );
};

export default PurchaseData;
