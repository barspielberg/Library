import classes from "./Navbar.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={classes.Navbar}>
      <Link to="/" className={classes.Link}>
        Home
      </Link>
      <Link to="/manager" className={classes.Link}>
        Manager page
      </Link>
    </nav>
  );
};

export default Navbar;
