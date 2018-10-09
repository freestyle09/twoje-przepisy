import React from "react";
import recipesService from "../services/recipes.service";

class Component extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="recipe-components">
        <h3 className="h3">Główne składniki:</h3>
        <div className="component">
          {this.props.components.map(el => {
            return (
              <div key={el.id} className="component-item">
                {el.name} {el.amount}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      div: []
    };
  }

  showDesc = e => {
    if (e.target.nodeName !== "BUTTON") {
      e.target.nextElementSibling.classList.toggle("step-description-show");
    }
  };

  markAsAgreed = e => {
    e.target.parentElement.classList.add("step-active");
    e.target.parentElement.nextElementSibling.classList.add("step-active");
  };

  render() {
    return (
      <div className="recipe-steps">

        <h3 className="h3">Sposób przygotowania:</h3>
        {this.props.steps.map(el => {
          return (
            <div key={el.id}>
              <div onClick={this.showDesc} className="step-title">
                Krok {el.id} - {el.name}
                {/*<button onClick={this.markAsAgreed} className="agree">*/}
                {/*Zatwierdź*/}
                {/*</button>*/}
              </div>
              <div className="step-description">{el.description}</div>
            </div>
          );
        })}
      </div>
    );
  }

  componentDidUpdate() {

  }

  componentDidMount() {
      this.id = setTimeout(() => {
          this.tempArr.push(document.querySelectorAll(".step-title:not(.step-active)"));
          this.setState({
              div: [...this.tempArr]
          })
      },100)
  }
}

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
                <Component components={this.state.components} />
                <Steps steps={this.state.steps} />
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