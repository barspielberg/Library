import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import CartItem from "../../../models/CartItem";
import { clearCart } from "../../../redux/actions/cartActions";
import { postPurchase } from "../../../services/purchaseService";
import PurchaseData from "./PurchaseData";

interface IPurchaseProps {
  items: CartItem[];
  show: boolean;
  clear: () => void;
}

const Purchase: React.FC<IPurchaseProps> = ({ show, items, clear }) => {
  const [blur, setBlur] = useState<CSSProperties>({});
  const history = useHistory();
  useEffect(() => {
    if (show)
      setBlur({
        backdropFilter: "blur(5px)  brightness(0.4)",
      });
  }, [show]);
  const purchaseHandler = async () => {
    await postPurchase(
      items,
      items.reduce((pre, i) => pre + i.getPrice(), 0)
    );
    clear();
    history.push("/");
  };

  return show ? (
    <React.Fragment>
      <div style={{ ...backDropStyle, ...blur }}></div>
      <div style={{ position: "absolute", left: "50%", minHeight: "90vh" }}>
        <PurchaseData items={items} purchaseHandler={purchaseHandler} />
      </div>
    </React.Fragment>
  ) : null;
};

const mapDispatch2Props = {
  clear: () => clearCart(),
};
export default connect(null, mapDispatch2Props)(Purchase);

const backDropStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 10,
  transition: "all 0.5s",
};
