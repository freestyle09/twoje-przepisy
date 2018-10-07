import React from "react";
import {
  HashRouter,
  BrowserRouter,
  Route,
  Link,
  Switch,
  NavLink
} from "react-router-dom";

export class Navigation extends React.Component {
  render() {
    return (
      <div>
        <NavLink exact to="/lista-przepisow">
          Lista przepisów
        </NavLink>
        <NavLink activeClassName="active" to="/dodaj-przepis">
          Dodaj przepis
        </NavLink>
        <NavLink activeClassName="active" to="/o-aplikacji">
          O Aplikacji
        </NavLink>
      </div>
    );
  }
}
