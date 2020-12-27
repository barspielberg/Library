import React from "react";
import { connect } from "react-redux";
import CartItem from "../../models/CartItem";
import { RootState } from "../../redux/reducers/mainReducer";

interface ICartPageProps {
  items: CartItem[];
}

const CartPage: React.FC<ICartPageProps> = ({ items }) => {
  return <div>CartPage Worked!</div>;
};

const mapState2Props = (state: RootState) => ({
  items: state.cart,
});
const mapDispatch2Props = {};
export default connect(mapState2Props, mapDispatch2Props)(CartPage);
