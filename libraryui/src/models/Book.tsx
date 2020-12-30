import { RowId, RowModel } from "@material-ui/data-grid";
import BookType from "./BookType";

class Book implements RowModel {
  constructor(
    public id: RowId = "",
    public title: string = "",
    public author: string = "",
    public publishDate: Date = new Date(),
    public price: number = 0,
    public inStock: number = 0,
    public discount: number = 0,
    public type: BookType = BookType.Magazine
  ) {}

  getPrice() {
    return (1 - this.discount / 100) * this.price;
  }
}

export default Book;
