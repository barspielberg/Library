import { makeStyles, Select } from "@material-ui/core";
import React from "react";
import BookType from "../../models/BookType";

const useStyles = makeStyles({
  select: {
    background: "#00838f",
    paddingLeft: "0.3rem",
  },
});

interface ISelectBookTypeProps {
  value?: BookType;
  onChange: (val: BookType) => void;
}

const SelectBookType: React.FC<ISelectBookTypeProps> = ({
  value,
  onChange,
}) => {
  const classes = useStyles();
  return (
    <Select
      native
      className={classes.select}
      value={value}
      onChange={(e) => onChange(e.target.value as BookType)}
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
