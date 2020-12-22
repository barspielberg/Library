import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/maneger" render={() => <div>maneger</div>} />
          <Route path="/" render={() => <div>home</div>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
