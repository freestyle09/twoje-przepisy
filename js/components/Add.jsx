import React from "react";
import { sendRecipe } from "../services/recipes.service";
import { Redirect } from "react-router-dom";

export class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      title: "",
      numberOfSteps: 3,
      numberOfComponents: 3
    };
  }

  titleStep = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  checkboxTimer = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };
  setTimer = e => {
    this.setState({
      [e.target.name]: e.target.value * 60000
    });
  };
  descriptionStep = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  titleComponent = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  makeInputs = () => {
    let steps = [];

    for (let i = 1; i <= this.state.numberOfSteps; i++) {
      steps.push(
        <div className="steps-add" key={i}>
          <div className="form-group">
            <label>
              Krok {i} tytuł:
              <input
                className="form-control"
                onChange={this.titleStep}
                name={"step" + i}
              />
            </label>

            <label>
              Czas ?
              <input
                type="checkbox"
                onChange={this.checkboxTimer}
                className="form-control"
                name={"timer" + i}
              />
            </label>
            {this.state["timer" + i] && (
              <label>
                Czas trwania czynności (minuty) :
                <input
                  type="number"
                  className="form-control"
                  name={"time" + i}
                  onChange={this.setTimer}
                />
              </label>
            )}
          </div>
          <div className="form-group">
            <label>
              Opis:
              <textarea
                className="form-control"
                onChange={this.descriptionStep}
                name={"description" + i}
              />
            </label>
          </div>
        </div>
      );
    }
    return steps;
  };
  makeComponents = () => {
    let components = [];

    for (let i = 1; i <= this.state.numberOfComponents; i++) {
      components.push(
        <div className="component-add" key={i}>
          <div className="form-group">
            <label>
              Składnik {i} tytuł i ilość:
              <input
                className="form-control"
                onChange={this.titleComponent}
                name={"component" + i}
              />
            </label>
          </div>
        </div>
      );
    }
    return components;
  };

  sendForm = e => {
    e.preventDefault();

    let steps = [];

    for (let i = 1; i <= this.state.numberOfSteps; i++) {
      let stepObj = {
        id: i,
        name: this.state[`step${i}`],
        description: this.state[`description${i}`],
        timer: this.state["time" + i]
      };
      steps.push(stepObj);
    }

    let components = [];

    for (let i = 1; i <= this.state.numberOfComponents; i++) {
      let compObj = {
        id: i,
        name: this.state[`component${i}`]
      };
      components.push(compObj);
    }
    let obj = {
      name: this.state.name,
      slug: this.state.name
        .trim()
        .split(" ")
        .join("-")
        .toLowerCase(),
      steps: steps,
      components: components
    };

    sendRecipe(obj, () => {
      this.setState({
        redirect: "/lista-przepisow/refresh/true"
      });
    });
  };

  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  handleTitleChange = e => {
    this.setState({
      step1: e.target.value
    });
  };
  handleNumberOfSteps = e => {
    this.setState({
      numberOfSteps: e.target.value
    });
  };
  handleNumberOfComponents = e => {
    this.setState({
      numberOfComponents: e.target.value
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="list">
        <h2 className="category-title">Dodaj przepis</h2>
        <form className="form" onSubmit={this.sendForm}>
          {/* Nazwa przepisu */}
          <div className="form-group">
            <label>
              Podaj nazwę przepisu
              <input
                onChange={this.handleNameChange}
                className="form-control"
                type="text"
                value={this.state.name}
              />
            </label>
          </div>

          {/* Składniki */}

          <div className="form-group">
            <label>
              Podaj ilość składników
              <input
                onChange={this.handleNumberOfComponents}
                className="form-control"
                type="number"
                value={this.state.numberOfComponents}
              />
            </label>
          </div>

          <div>{this.makeComponents()}</div>

          {/* Ile kroków chcesz mieć w przepisie */}
          <div className="form-group">
            <label>
              Podaj ilość kroków
              <input
                onChange={this.handleNumberOfSteps}
                className="form-control"
                type="number"
                value={this.state.numberOfSteps}
              />
            </label>
          </div>

          {/* Opis kroków */}

          <div>{this.makeInputs()}</div>

          <div className="form-group">
            <button className="btn btn-success" type="submit">
              Wyślij
            </button>
          </div>
        </form>
      </div>
    );
  }
}
