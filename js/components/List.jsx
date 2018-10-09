import React from "react";
import { NavLink } from "react-router-dom";
import recipesService from "../services/recipes.service";

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  render() {
    return (
      <div className="list">
        <h1 className="category-title">Moje Przepisy</h1>

        {this.state.recipes.map((el, index) => (
          <NavLink
            to={"/lista-przepisow/" + el.slug}
            className="recipe-title"
            key={el.id}
          >
            {" "}
            <span>{index + 1}.</span> {el.name}
          </NavLink>
        ))}
      </div>
    );
  }
  componentDidMount() {
    recipesService.then(data => {
      this.setState({
        recipes: data
      });
    });
  }
}
