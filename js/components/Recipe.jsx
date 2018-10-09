import React from "react";
import recipesService from "../services/recipes.service";

export class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: [],
      steps: [],
      components: []
    };
  }
  render() {
    return (
      <div>
        {this.state.recipe.map(el => {
          return (
            <div className="list" key={el.id}>
              <h2 className="category-title">{el.name}</h2>
              <div className="recipe-container">
                <div className="recipe-components">
                  <h3 className="h3">Główne składniki:</h3>
                  <div className="component">
                    {this.state.components.map(el => {
                      return (
                        <div className="component-item">
                          {el.name} {el.amount}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="recipe-steps">
                  <h3 className="h3">Sposób przygotowania:</h3>
                  <div>
                    {this.state.steps.map(el => {
                      return (
                        <div>
                          <div>{el.name}</div>
                          <div>{el.description}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    //filter recipe
    recipesService.then(data => {
      this.setState(
        {
          recipe: data.filter(el => el.slug === this.props.match.params.id)
        },
        () => {
          let tempSteps = [];
          let tempComponents = [];
          for (let elem of this.state.recipe) {
            for (let el of elem.steps) {
              tempSteps.push(el);
            }
            for (let el of elem.components) {
              tempComponents.push(el);
            }
          }
          this.setState({
            steps: tempSteps,
            components: tempComponents
          });
        }
      );
    });
  }
}
