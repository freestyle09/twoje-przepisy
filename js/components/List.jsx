import React from "react";

export class List extends React.Component {
  url = "http://localhost:3000/recipes";
  recipesArr = [];
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

          {this.state.recipes.map((el,index) => <div className='recipe-title' key={el.id}> <span>{index + 1}.</span> {el.name}</div>)}

      </div>
    );
  }
  componentDidMount() {
    fetch(this.url)
      .then(resp => resp.json())
      .then(data => {
          for(let el of data) {
              this.recipesArr.push(el);
          }
          this.setState({
              recipes: this.recipesArr
          })
      });
  }
}
