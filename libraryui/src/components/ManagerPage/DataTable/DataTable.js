import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

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
  { id: 1, title: "book1", author: "Jon", publishDate: new Date(), price: 32.2 },
  { id: 2, title: "book2", author: "Jon", publishDate: new Date('1.1.98'), price: 35 },
  { id: 3, title: "book3", author: "Jon", publishDate: new Date('4/8/21'), price: 11.5 },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "#424242" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}
