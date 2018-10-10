import React from "react";
import recipesService from "../services/recipes.service";
import swal from "sweetalert2";

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
      id: 1,
      timer: false
    };
  }

  audio = new Audio(
    "https://freesound.org/data/previews/186/186719_105499-lq.mp3"
  );

  showDesc = e => {
    if (e.target.nodeName !== "BUTTON" && e.target.id !== "timer") {
      e.target.nextElementSibling.classList.toggle("step-description-show");
    }
  };

  markAsAgreed = e => {
    clearInterval(this.id);
    this.setState({
      id: this.state.id + 1,
      timer: false
    });
    e.target.parentElement.classList.add("step-active");
    e.target.parentElement.nextElementSibling.classList.add(
      "step-active-description"
    );
  };

  startCountingDown = e => {
    let div = e.target.parentElement.parentElement;
    e.target.disabled = true;

    this.setState({
      timer: e.target.parentElement.dataset.timer
    });
    this.id = setInterval(() => {
      this.setState(
        {
          timer: +this.state.timer - 1000
        },
        () => {
          if (this.state.timer === 0) {
            this.audio.loop = true;
            swal({
              title: "Zrobione!",
              text: "Przejdź do następnego kroku",
              type: "success",
              onOpen: this.audio.play(),
              onClose: () => {
                this.audio.pause();
                this.audio.currentTime = 0;
              },
              confirmButtonText: "Zakończ"
            });

            // alert("hej", this.audio.play());
            div.classList.add("step-active");
            div.nextElementSibling.classList.add("step-active-description");
            // this.audio.loop(true)

            this.setState({
              id: this.state.id + 1
            });
            clearInterval(this.id);
          }
        }
      );
    }, 1000);
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
                {el.timer &&
                  this.state.id === el.id && (
                    <div data-timer={el.timer} id="timer">
                      {!this.state.timer
                        ? el.timer / 1000
                        : this.state.timer / 1000}{" "}
                      sekund
                      <button
                        onClick={this.startCountingDown}
                        className="agree"
                      >
                        Start
                      </button>
                    </div>
                  )}
                <button
                  ref={el => (this.button = el)}
                  onClick={this.markAsAgreed}
                  className={this.state.id !== el.id ? "disabled" : "agree"}
                >
                  Potwierdź
                </button>
              </div>

              <div className="step-description">{el.description}</div>
            </div>
          );
        })}
      </div>
    );
  }

  componentWillUpdate() {}

  componentWillUnmount() {
    clearInterval(this.id);
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
