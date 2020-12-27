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
    flex: 1,
    minWidth: 400,
    maxWidth: 700,
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

const validate = {
  b0t100: (n: number) => n >= 0 && n <= 100,
  text: (t: string) => !!t.trim(),
  above0: (n: number) => n >= 0,
};

type props = {
  select: (book: Book) => void;
  postBook: (type: BookType, bookdata: IBookData) => void;
  putBook: (type: BookType, bookdata: IBookData) => void;
  type: BookType;
  bookData: IBookData;
  setType: (t: BookType) => void;
  setBookData: (b: IBookData) => void;
};

const EditBook: React.FC<props> = ({
  select,
  postBook,
  putBook,
  type,
  bookData,
  setType,
  setBookData,
}) => {
  const classes = useStyles();

  const [isNew, setIsNew] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => setIsNew(!bookData.id), [setIsNew, bookData]);

  useEffect(() => {
    setValid(
      validate.text(bookData.title) &&
        validate.text(bookData.author) &&
        validate.above0(bookData.price) &&
        validate.above0(bookData.inStock) &&
        validate.b0t100(bookData.discount)
    );
  }, [bookData, setValid]);

  const getMenuItem = () =>
    Object.values(BookType).map((k, index) => (
      <MenuItem key={index} value={k}>
        {k}
      </MenuItem>
    ));

  const onDateChange = (date: MaterialUiPickersDate) => {
    setBookData({ ...bookData, publishDate: date?.toDate() || "" });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valid) return;
    if (isNew) {
      postBook(type, bookData);
    } else {
      putBook(type, bookData);
    }
    select(new Book());
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={onSubmitHandler}
    >
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
          disabled={!isNew}
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
        error={!validate.text(bookData.title)}
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
        error={!validate.text(bookData.author)}
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
          endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }}
        value={bookData.price}
        error={!validate.above0(bookData.price)}
        onChange={(e) => {
          setBookData({ ...bookData, price: +e.target.value });
        }}
      />
      <TextField
        required
        id="inStock"
        label="In Stock"
        type="number"
        value={bookData.inStock}
        error={!validate.above0(bookData.inStock)}
        onChange={(e) => {
          setBookData({ ...bookData, inStock: +e.target.value });
        }}
      />
      <TextField
        required
        id="discount"
        label="Discount"
        type="number"
        error={!validate.b0t100(bookData.discount)}
        helperText={
          validate.b0t100(bookData.discount)
            ? ""
            : "Discount cannot be above 100% or below 0"
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        value={bookData.discount}
        onChange={(e) => {
          setBookData({ ...bookData, discount: +e.target.value });
        }}
      />
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Fab
          color="secondary"
          aria-label="edit"
          type="submit"
          disabled={!valid}
        >
          {isNew ? <AddIcon /> : <SaveIcon />}
        </Fab>
      </div>
    </form>
  );
};
//TODO add image
const mapDispatch = {
  postBook: (type: BookType, bookdata: IBookData) =>
    postBookAsync(type, bookdata),
  putBook: (type: BookType, bookdata: IBookData) =>
    putBookAsync(type, bookdata),
};

export default connect(null, mapDispatch)(EditBook);
