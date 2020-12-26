import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import ManagerPage from "./ManagerPage/ManagerPage";
import Navbar from "./Navbar";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: blue[300],
    },
    secondary: {
      main: green[600],
    },
    background: {
      paper: "#4c4c4c",
    },
  },
});

const useStyles = makeStyles({
  navbar: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    zIndex: 100,
  },
  footer: {
    height: "4rem",
  },
});

const App: React.FC = () => {
  const classes = useStyles();
  console.log(theme);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <section>
            <Switch>
              <Route path="/manager" component={ManagerPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </section>
          <nav className={classes.navbar}>
            <Navbar />
          </nav>
          <footer className={classes.footer} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
