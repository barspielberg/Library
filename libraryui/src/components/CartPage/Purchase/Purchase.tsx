import { CSSProperties } from "@material-ui/core/styles/withStyles";
import React, { useEffect, useState } from "react";
import CartItem from "../../../models/CartItem";
import PurchaseData from "./PurchaseData";

interface IPurchaseProps {
  items: CartItem[];
  show: boolean;
}

const Purchase: React.FC<IPurchaseProps> = ({ show, items }) => {
  const [blur, setBlur] = useState<CSSProperties>({});

  useEffect(() => {
    if (show)
      setBlur({
        backdropFilter: "blur(5px)  brightness(0.4)",
      });
  }, [show]);

  return show ? (
    <React.Fragment>
      <div style={{ ...backDropStyle, ...blur }}></div>
      <div style={{ position: "absolute", left: "50%", minHeight: "90vh" }}>
        <PurchaseData items={items} />
      </div>
    </React.Fragment>
  ) : null;
};

export default Purchase;

const backDropStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  width: "100%",
  height: "100%",
  zIndex: 10,
  transition: "all 0.5s",
};
