import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const columns = [
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
  {
    id: 5,
    title: "book1",
    author: "Jon",
    publishDate: new Date(),
    price: 32.2,
  },
  {
    id: 2,
    title: "book2",
    author: "Jon",
    publishDate: new Date("1.1.98"),
    price: 35,
  },
  {
    id: 3,
    title: "book3",
    author: "Jon",
    publishDate: new Date("4/8/21"),
    price: 11.5,
  },
];
const btnStyle = {
  position: "absolute",
  bottom: "0.5rem",
  left: "8rem",
  color: "white",
  background: "transparent",
  border: "none",
  cursor:"pointer",
};
const DataTable = ({ select }) => {
  const [selcetedBooks, setSelectedBooks] = useState([]);

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
