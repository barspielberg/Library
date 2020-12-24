import { RowId, RowModel } from "@material-ui/data-grid";


class Book implements RowModel {
    constructor(public id: RowId="",
        public title?: string,
        public author?: string,
        public publishDate?: Date,
        public price?: number) { }
        
}

export default Book
