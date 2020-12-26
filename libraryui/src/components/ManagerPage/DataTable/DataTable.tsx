import React, { CSSProperties, useEffect, useState } from "react";
import { ColDef, DataGrid, RowId } from "@material-ui/data-grid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Book from "../../../models/Book";
import BookType from "../../../models/BookType";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers/mainReducer";
import {
  clearAll,
  deleteBooksAsnc,
  getBooksAsync,
} from "../../../redux/actions/booksActions";

const columns: ColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "type",
    headerName: "Type",
    width: 120,
  },
  { field: "title", headerName: "Title", width: 120 },
  { field: "author", headerName: "Author", width: 120 },
  {
    field: "publishDate",
    headerName: "Publish Date",
    type: "date",
    width: 150,
  },
  { field: "price", headerName: "Price", width: 70 },
];

const btnStyle: CSSProperties = {
  position: "absolute",
  bottom: "0.5rem",
  left: "8rem",
  color: "white",
  background: "transparent",
  border: "none",
  cursor: "pointer",
};

type props = {
  select: (book: Book) => void;
  books: Book[];
  getBooks: (type: BookType) => void;
  clearBooks: () => void;
  deleteBooks: (ids: string[]) => void;
};

const DataTable = ({
  select,
  books,
  getBooks,
  clearBooks,
  deleteBooks,
}: props) => {
  const [selcetedBooks, setSelectedBooks] = useState<RowId[]>([]);

  useEffect(() => {
    clearBooks();
    getBooks(BookType.Magazine);
  }, [clearBooks, getBooks]);

  const deleteHandler = () => {
    deleteBooks(selcetedBooks.map((i) => i.toString()));
  };

  return (
    <div style={{ height: 400, width: 750, backgroundColor: "#424242" }}>
      <DataGrid
        rows={books}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onSelectionChange={(params) => setSelectedBooks(params.rowIds)}
        onRowClick={(params) => select(params.row as Book)}
      />
      {selcetedBooks.length > 0 && (
        <button style={btnStyle} onClick={deleteHandler}>
          <DeleteForeverIcon />
        </button>
      )}
    </div>
  );
};

const mapState = (state: RootState) => ({
  books: state.books,
});

const mapDispatch = {
  getBooks: (type: BookType) => getBooksAsync(type),
  clearBooks: () => clearAll(),
  deleteBooks: (ids: string[]) => deleteBooksAsnc(ids),
};

export default connect(mapState, mapDispatch)(DataTable);
