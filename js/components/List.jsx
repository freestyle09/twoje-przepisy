import React from "react";
import { NavLink, Redirect } from "react-router-dom";
import { recipesService, reload } from "../services/recipes.service";

export class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      redirect: ""
    };
  }

  render() {
    if (this.state.redirect !== "") {
      return <Redirect to={this.state.redirect} />;
    }
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
    if (this.props.match.params.confirm === "true") {
      reload().then(data => {
        this.setState({
          recipes: data,
          redirect: "/"
        });
      });
    } else {
      reload().then(data => {
        this.setState({
          recipes: data
        });
      });
    }
  }
}
