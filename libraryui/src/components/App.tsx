import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { blue, green } from "@material-ui/core/colors";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import HomePage from "./HomePage/HomePage";
import ManagerPage from "./ManagerPage/ManagerPage";

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

const App: React.FC = () => {
  //TODO cart page
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div>
          <TopBar />
          <section>
            <Switch>
              <Route path="/manager" component={ManagerPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </section>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
