import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { List } from "./components/List";
import { NotFound } from "./components/NotFound";
import { Add } from "./components/Add";
import { Navigation } from "./components/Navigation";
import { About } from "./components/About";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "../scss/style.scss";

document.addEventListener("DOMContentLoaded", function() {
  class Home extends React.Component {
    render() {
      return <Redirect to="/lista-przepisow" />;
    }
  }

  const App = () => {
    return (
      <HashRouter>
        <div>
          <div className="bgImage" />
          <section id="header">
            <Header />
            <Navigation />
          </section>
          <div className="papyrus">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/lista-przepisow" component={List} />
              <Route path="/dodaj-przepis" component={Add} />
              <Route path="/o-aplikacji" component={About} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </HashRouter>
    );
  };
  ReactDOM.render(<App />, document.getElementById("app"));
});
