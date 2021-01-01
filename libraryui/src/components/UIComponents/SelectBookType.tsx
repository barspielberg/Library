import { makeStyles, Select } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import Book from "../../models/Book";
import BookType from "../../models/BookType";

const useStyles = makeStyles({
  select: {
    background: "#00838f",
    paddingLeft: "0.3rem",
  },
});

interface ISelectBookTypeProps {
  books: Book[];
  onFilterChanged: (filterdBooks: Book[]) => void;
}

const SelectBookType: React.FC<ISelectBookTypeProps> = ({
  books,
  onFilterChanged,
}) => {
  const classes = useStyles();
  const [type, setType] = useState<BookType>();

  const handelTypeChange = (type: BookType | undefined) => {
    setType(type);
    filterBooks(type);
  };
  const filterBooks = useCallback(
    (type: BookType | undefined) => {
      if (!type) onFilterChanged(books);
      else onFilterChanged(books.filter((b) => b.type === type));
    },
    [onFilterChanged, books]
  );
  useEffect(() => filterBooks(type), [books, filterBooks, type]);
  return (
    <Select
      native
      className={classes.select}
      value={type}
      onChange={(e) => handelTypeChange(e.target.value as BookType)}
    >
      <option aria-label="None" value="">
        All Books
      </option>
      {Object.values(BookType).map((k, index) => (
        <option key={index} value={k}>
          {k}s
        </option>
      ))}
    </Select>
  );
};

export default SelectBookType;
