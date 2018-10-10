import React from "react";

export class Add extends React.Component {
  sendForm = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="list">
        <h2 className="category-title">Dodaj przepis</h2>
        <form onSubmit={this.sendForm}>
          <div className='form-group'>
            <label>
              Podaj nazwę przepisu
              <input className='form-control' type="text" />
            </label>
          </div>
        </form>
      </div>
    );
  }
}
