import React, { useEffect, useState } from "react";
import {
  AppBar,
  Fab,
  FormControl,
  InputAdornment,
  InputLabel,
  makeStyles,
  Select,
  Tab,
  Tabs,
  TextField,
  MenuItem,
} from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import SaveIcon from "@material-ui/icons/SaveOutlined";
import AddIcon from "@material-ui/icons/Add";
import Book from "../../../models/Book";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import BookType from "../../../models/BookType";
import { connect } from "react-redux";
import {
  postBookAsync,
  putBookAsync,
} from "../../../redux/actions/booksActions";
import IBookData from "../../../models/IBookData";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: "0.5rem 2rem",
    },
    "& .MuiFab-root": {
      margin: "0.5rem",
    },
  },
  formControl: {
    margin: "0.5rem 2rem",
    minWidth: 120,
  },
}));

type props = {
  selected: Book;
  select: (book: Book) => void;
  postBook: (type: BookType, bookdata: IBookData) => void;
  putBook: (type: BookType, bookdata: IBookData) => void;
};

const EditBook: React.FC<props> = ({ selected, select, postBook, putBook }) => {
  const classes = useStyles();

  const [isNew, setIsNew] = useState(true);
  const [type, setType] = useState(selected.type);

  const [bookData, setBookData] = useState<IBookData>({
    id: selected.id.toString() || undefined,
    title: selected.title,
    author: selected.author,
    price: selected.price,
    publishDate: selected.publishDate,
    inStock: selected.inStock,
    discount: selected.discount,
  });

  useEffect(() => {
    setBookData({
      id: selected.id.toString() || undefined,
      title: selected.title,
      author: selected.author,
      price: selected.price,
      publishDate: selected.publishDate,
      inStock: selected.inStock,
      discount: selected.discount,
    });
  }, [setBookData, selected]);

  useEffect(() => setIsNew(!selected.id), [setIsNew, selected]);

  const getMenuItem = () =>
    Object.values(BookType).map((k, index) => (
      <MenuItem key={index} value={k}>
        {k}
      </MenuItem>
    ));

  const onDateChange = (date: MaterialUiPickersDate) => {
    setBookData({ ...bookData, publishDate: date?.toDate() || "" });
  };

  const onSubmitHandler = () => {
    if (isNew) {
      postBook(type, bookData);
    } else {
      putBook(type, bookData);
    }
    select(new Book());
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <AppBar position="static" color="default">
        <Tabs
          value={isNew}
          onChange={(e, v) => select(new Book())}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Edit Book" disabled={isNew} value={false} />
          <Tab label="New Book" value={true} />
        </Tabs>
      </AppBar>
      {!isNew && (
        <TextField
          id="id"
          label="id"
          value={bookData.id}
          InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: !!bookData.id,
          }}
          onChange={(e) => {
            setBookData({ ...bookData, id: e.target.value || undefined });
          }}
        />
      )}

      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Type</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={type}
          onChange={(e) => setType(e.target.value as BookType)}
        >
          {getMenuItem()}
        </Select>
      </FormControl>
      <TextField
        required
        id="title"
        label="Title"
        value={bookData.title}
        InputLabelProps={{
          shrink: !!bookData.title,
        }}
        onChange={(e) => {
          setBookData({ ...bookData, title: e.target.value });
        }}
      />
      <TextField
        required
        id="author"
        label="Author"
        value={bookData.author}
        InputLabelProps={{
          shrink: !!bookData.author,
        }}
        onChange={(e) => {
          setBookData({ ...bookData, author: e.target.value });
        }}
      />

      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="DD/MM/yyyy"
          margin="normal"
          id="publishDate"
          label="Publish Date"
          value={bookData.publishDate}
          onChange={(date) => onDateChange(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      <TextField
        required
        id="price"
        label="Price"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        value={bookData.price}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setBookData({ ...bookData, price: +e.target.value });
        }}
      />
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Fab color="secondary" aria-label="edit" onClick={onSubmitHandler}>
          {isNew ? <AddIcon /> : <SaveIcon />}
        </Fab>
      </div>
    </form>
  );
};

const mapDispatch = {
  postBook: (type: BookType, bookdata: IBookData) =>
    postBookAsync(type, bookdata),
  putBook: (type: BookType, bookdata: IBookData) =>
    putBookAsync(type, bookdata),
};

export default connect(null, mapDispatch)(EditBook);
