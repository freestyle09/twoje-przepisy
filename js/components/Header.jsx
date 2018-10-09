import React from "react";
import { NavLink } from "react-router-dom";

export class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <NavLink to='/'>
          <h1 className="h1">
            Twoje <img src="../../images/egg-24404_1280.png" />{" "}
            <span className="header-color"> Przepisy </span>
          </h1>
        </NavLink>
      </div>
    );
  }
}
