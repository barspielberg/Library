import axios from "axios";
import CartItem from "../models/CartItem";

axios.defaults.baseURL = "https://localhost:44381/api/";

interface ItemData {
  bookId: string;
  amount: number;
}

export const postPurchase = (items: CartItem[], price: number) => {
  const itemsData: ItemData[] = items.map((i) => ({
    bookId: i.book.id.toString(),
    amount: i.amount,
  }));

  return axios.post("Purchase/?priceInDollars=" + price, itemsData);
};
