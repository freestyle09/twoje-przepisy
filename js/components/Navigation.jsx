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
      <nav>
        <ul className='navigation'>
          <li>
            <NavLink exact to="/lista-przepisow">
              Moje przepisy
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/dodaj-przepis">
              Dodaj przepis
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/o-aplikacji">
              O Aplikacji
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
