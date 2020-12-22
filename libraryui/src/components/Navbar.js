import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import StorageIcon from "@material-ui/icons/Storage";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    width: "100%",
    "justify-content": "space-around",
  },
});

const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(history.location.pathname);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        history.push(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="Manager"
        value="/manager"
        icon={<StorageIcon />}
      />
    </BottomNavigation>
  );
};

export default Navbar;
