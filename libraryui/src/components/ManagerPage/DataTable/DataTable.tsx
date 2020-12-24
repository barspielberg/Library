import React, { CSSProperties, useState } from "react";
import { ColDef, DataGrid, RowId} from "@material-ui/data-grid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Book from "../../../models/Book";

const columns: ColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "title", headerName: "Title", width: 150 },
  { field: "author", headerName: "Author", width: 150 },
  {
    field: "publishDate",
    headerName: "Publish Date",
    type: "date",
    width: 150,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
];

const rows = [
  new Book("5", "book1", "Jon", new Date(), 32.2),
  new Book("2", "book2", "Jon", new Date("1.1.98"), 35),
  new Book("3", "book3", "Jon", new Date("4/8/21"), 11.5)
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
