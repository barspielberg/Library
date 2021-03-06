import React from "react";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { connect } from "react-redux";
import { RootState } from "../../redux/reducers/mainReducer";
import { Badge } from "@material-ui/core";
import MenuBtn from "./MenuBtn";
import { useHistory } from "react-router";
import CartItem from "../../models/CartItem";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "#00838f",
      color: "whitesmoke",
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      cursor: "pointer",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  })
);

interface ITopBarProps {
  cart: CartItem[];
}

const TopBar: React.FC<ITopBarProps> = ({ cart }) => {
  const classes = useStyles();
  const history = useHistory();
  const searchHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    history.push("/?search=" + e.target.value);
  };
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <MenuBtn />
        <Typography
          variant="h6"
          className={classes.title}
          onClick={() => history.push("/")}
        >
          The Library
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            onChange={searchHandler}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div className={classes.grow} />
        <IconButton
          edge="end"
          className={classes.menuButton}
          color="inherit"
          aria-label="ShoppingCart"
          onClick={() => history.push("/cart")}
        >
          <Badge
            badgeContent={cart.reduce((prv, i) => prv + i.amount, 0)}
            color="secondary"
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

const mapState2Props = (state: RootState) => ({
  cart: state.cart,
});
const mapDispatch2Props = {};
export default connect(mapState2Props, mapDispatch2Props)(TopBar);
