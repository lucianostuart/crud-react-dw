import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Gasto from "./components/gasto.component";
import GastosList from "./components/gasto-lista.component";
import AddGasto from "./components/gasto-add.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/gastos"} className="navbar-brand">
            Stalker de Bolso
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/gastos"} className="nav-link">
                Gastos
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Adicionar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/gastos"]} component={GastosList} />
            <Route exact path="/add" component={AddGasto} />
            <Route path="/gastos/:id" component={Gasto} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
