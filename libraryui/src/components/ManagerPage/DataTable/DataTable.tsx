import React, { CSSProperties, useState } from "react";
import { ColDef, DataGrid, RowId } from "@material-ui/data-grid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Book from "../../../models/Book";
import BookType from "../../../models/BookType";

const columns: ColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "type", headerName: "Type", width: 120,
    valueFormatter: params => BookType[Number(params.value)]
  },
  { field: "title", headerName: "Title", width: 120 },
  { field: "author", headerName: "Author", width: 120 },
  { field: "publishDate", headerName: "Publish Date", type: "date", width: 150, },
  { field: "price", headerName: "Price", width: 70, },
];

const rows = [
  new Book("5", "book1", "Jon", new Date(), 32.2, BookType.Magazine),
  new Book("2", "book2", "Jon", new Date("1.1.98"), 35, BookType.StudyBook),
  new Book("3", "book3", "Jon", new Date("4/8/21"), 11.5, BookType.Novel)
];
const btnStyle: CSSProperties = {
  position: "absolute",
  bottom: "0.5rem",
  left: "8rem",
  color: "white",
  background: "transparent",
  border: "none",
  cursor: "pointer"
};

type props = {
  select: (book: Book) => void
}

const DataTable = ({ select }: props) => {
  const [selcetedBooks, setSelectedBooks] = useState<RowId[]>([]);

  const deleteHandler = () => {
    console.log(selcetedBooks);
  };

  return (
    <div style={{ height: 400, width: 750, backgroundColor: "#424242" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionChange={(params) => setSelectedBooks(params.rowIds)}
        onRowClick={(params) => select(params.row)}
      />
      {selcetedBooks.length > 0 && (
        <button style={btnStyle} onClick={deleteHandler}>
          <DeleteForeverIcon />
        </button>
      )}
    </div>
  );
};

export default DataTable;
