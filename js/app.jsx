import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { List } from "./components/List";
import { NotFound } from "./components/NotFound";
import { Add } from "./components/Main";
import { Navigation } from "./components/Navigation";
import { About } from "./components/About";
import "../scss/style.scss";

document.addEventListener("DOMContentLoaded", function() {
  const App = () => {
    return (
      <HashRouter>
        <div>
          <Navigation />
          <Switch>
            {/*<Redirect from="/" to="/lista-przepisow" />*/}
            <Route path="/lista-przepisow" component={List} />
            <Route path="/dodaj-przepis" component={Add} />
            <Route path="/o-aplikacji" component={About} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </HashRouter>
    );
  };
  ReactDOM.render(<App />, document.getElementById("app"));
});
