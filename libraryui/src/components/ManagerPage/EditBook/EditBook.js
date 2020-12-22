import { InputAdornment, makeStyles, TextField } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#424242",
    display: "flex",
    flexDirection: "column",
    "& .MuiTextField-root": {
      margin: "0.5rem 2rem",
    },
  },
}));

const EditBook = () => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="id"
        label="id"
        defaultValue="45-54"
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField required id="title" label="Title" />
      <TextField required id="author" label="Author" />
      <TextField required id="publishDate" label="Publish Date" type="date" />
      <TextField
        required
        id="price"
        label="Price"
        type="number"
        InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
      />
    </form>
  );
};

export default EditBook;
