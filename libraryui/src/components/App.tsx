import { createMuiTheme, ThemeProvider } from "@material-ui/core";
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
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <header>
            <Navbar />
          </header>
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
}

export default App;
