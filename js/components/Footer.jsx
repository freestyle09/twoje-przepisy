import React from "react";

export class Footer extends React.Component {
  date = new Date();
  render() {
    return <footer>Copyright &copy; Józef Rzadkosz {this.date.getFullYear()}</footer>;
  }
}
