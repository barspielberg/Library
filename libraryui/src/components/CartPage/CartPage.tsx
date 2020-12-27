import React from "react";
import { connect } from "react-redux";
import Book from "../../models/Book";
import { RootState } from "../../redux/reducers/mainReducer";

interface ICartPageProps {
  items: Book[];
}

const CartPage: React.FC<ICartPageProps> = ({ items }) => {
  return <div>CartPage Worked!</div>;
};

const mapState2Props = (state: RootState) => ({
  items: state.cart,
});
const mapDispatch2Props = {};
export default connect(mapState2Props, mapDispatch2Props)(CartPage);
