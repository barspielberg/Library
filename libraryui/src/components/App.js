import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import ManagerPage from "./ManagerPage/ManagerPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/manager" component={ManagerPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
