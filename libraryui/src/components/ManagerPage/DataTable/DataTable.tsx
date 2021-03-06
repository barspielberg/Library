import React, { useEffect, useState } from "react";
import { ColDef, DataGrid, RowId } from "@material-ui/data-grid";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import Book from "../../../models/Book";
import BookType from "../../../models/BookType";
import { connect } from "react-redux";
import { RootState } from "../../../redux/reducers/mainReducer";
import {
  clearAll,
  deleteBooksAsnc,
  getBooksAsync,
} from "../../../redux/actions/booksActions";
import { makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import SelectBookType from "../../UIComponents/SelectBookType";

const columns: ColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "type", headerName: "Type", width: 120 },
  { field: "title", headerName: "Title", width: 120 },
  { field: "author", headerName: "Author", width: 120 },
  {
    field: "publishDate",
    headerName: "Publish Date",
    type: "date",
    width: 150,
  },
  { field: "price", headerName: "Price ($)", width: 90 },
  { field: "inStock", headerName: "In Stock", width: 100 },
  { field: "discount", headerName: "Discount (%)", width: 120 },
];

const useStyles = makeStyles((theme) => ({
  raper: {
    height: 400,
    // width: 750,
    marginBottom: "1rem",
  },
  table: {
    backgroundColor: theme.palette.background.paper,
    "& .MuiDataGrid-colCellWrapper": {
      backgroundColor: grey[900],
    },
  },
  delBtn: {
    position: "absolute",
    bottom: "0.2rem",
    left: "7.5rem",
  },
  selectType: { display: "flex", flexDirection: "column", marginTop: "1rem" },
}));

interface props {
  select: (book: Book) => void;
  books: Book[];
  getBooks: (type: BookType) => void;
  clearBooks: () => void;
  deleteBooks: (ids: string[]) => void;
}

const DataTable: React.FC<props> = ({
  select,
  books,
  getBooks,
  clearBooks,
  deleteBooks,
}) => {
  const classes = useStyles();
  const [selcetedBooks, setSelectedBooks] = useState<RowId[]>([]);
  const [filterdBooks, setFilterdBooks] = useState(books);

  useEffect(() => {
    clearBooks();
    getBooks(BookType.Magazine);
    getBooks(BookType.Novel);
    getBooks(BookType.StudyBook);
  }, [clearBooks, getBooks]);

  const deleteHandler = () => {
    deleteBooks(selcetedBooks.map((i) => i.toString()));
    setSelectedBooks([]);
  };

  return (
    <React.Fragment>
      <div className={classes.selectType}>
        <SelectBookType books={books} onFilterChanged={setFilterdBooks} />
      </div>
      <div className={classes.raper}>
        <DataGrid
          className={classes.table}
          rows={filterdBooks}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionChange={(params) => setSelectedBooks(params.rowIds)}
          onRowClick={(params) => select(params.row as Book)}
        />

        {selcetedBooks.length > 0 && (
          <IconButton
            aria-label="DeleteForever"
            className={classes.delBtn}
            onClick={deleteHandler}
          >
            <DeleteForeverIcon />
          </IconButton>
        )}
      </div>
    </React.Fragment>
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
