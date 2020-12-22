import { React } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import ManagerPage from "./ManagerPage/ManagerPage";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <header>
         <Navbar/>
       </header>
        <section>
          <Switch>
            <Route path="/manager" component={ManagerPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
