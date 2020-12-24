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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#424242",
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
};

const EditBook = ({ selected, select }: props) => {
  const classes = useStyles();

  const [isNew, setIsNew] = useState(true);

  const [id, setId] = useState(selected.id);
  const [type, setType] = useState(selected.type);
  const [title, setTitle] = useState(selected.title);
  const [author, setAuthor] = useState(selected.author);
  const [publishDate, setPublishDate] = useState<Date | MaterialUiPickersDate>(
    selected.publishDate
  );
  const [price, setPrice] = useState(selected.price);

  useEffect(() => {
    setId(selected.id);
    setType(selected.type);
    setTitle(selected.title);
    setAuthor(selected.author);
    setPrice(selected.price);
    setPublishDate(selected.publishDate);
  }, [setId, setTitle, setAuthor, setPublishDate, setPrice, selected]);

  useEffect(() => setIsNew(!selected.id), [setIsNew, selected]);

  const getMenuItem = () => {
    const items = [];
    for (const val in BookType) {
      if (!isNaN(Number(val)))
        items.push(
          <MenuItem key={val} value={val}>
            {BookType[val]}
          </MenuItem>
        );
    }
    return items;
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
          value={id}
          InputProps={{
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: !!id,
          }}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
      )}

      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Age</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={type}
          onChange={(e) => setType(Number(e.target.value))}
        >
          {getMenuItem()}
        </Select>
      </FormControl>
      <TextField
        required
        id="title"
        label="Title"
        value={title}
        InputLabelProps={{
          shrink: !!title,
        }}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <TextField
        required
        id="author"
        label="Author"
        value={author}
        InputLabelProps={{
          shrink: !!author,
        }}
        onChange={(e) => {
          setAuthor(e.target.value);
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
          value={publishDate}
          onChange={(date) => setPublishDate(date)}
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
        value={price}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => {
          setPrice(+e.target.value);
        }}
      />
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Fab color="secondary" aria-label="edit">
          {isNew ? <AddIcon /> : <SaveIcon />}
        </Fab>
      </div>
    </form>
  );
};

export default EditBook;
