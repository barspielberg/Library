import { RowId, RowModel } from "@material-ui/data-grid";
import BookType from "./BookType";


class Book implements RowModel {
    constructor(public id: RowId = "",
        public title?: string,
        public author?: string,
        public publishDate?: Date,
        public price?: number,
        public type?: BookType) { }

}

export default Book
