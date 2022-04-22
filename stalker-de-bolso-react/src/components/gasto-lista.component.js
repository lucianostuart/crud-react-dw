import React, { Component } from "react";
import GastoDataService from "../services/gasto.service";
import { Link } from "react-router-dom";

export default class GastosList extends Component {
  constructor(props) {
    super(props);
    this.onChangeBuscarNome = this.onChangeBuscarNome.bind(this);
    this.retrieveGastos = this.retrieveGastos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveGasto = this.setActiveGasto.bind(this);
    this.removeAllGastos = this.removeAllGastos.bind(this);
    this.buscarNome = this.buscarNome.bind(this);

    this.state = {
      gastos: [],
      currentGasto: null,
      currentIndex: -1,
      buscarNome: ""
    };
  }

  componentDidMount() {
    this.retrieveGastos();
  }

  onChangeBuscarNome(e) {
    const buscarNome = e.target.value;

    this.setState({
      buscarNome: buscarNome
    });
  }

  retrieveGastos() {
    GastoDataService.getAll()
      .then(response => {
        this.setState({
          gastos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveGastos();
    this.setState({
      currentGasto: null,
      currentIndex: -1
    });
  }

  setActiveGasto(gastos, index) {
    this.setState({
      currentGasto: gastos,
      currentIndex: index
    });
  }

  removeAllGastos() {
    GastoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  buscarNome() {
    this.setState({
      currentGasto: null,
      currentIndex: -1
    });

    GastoDataService.findByNome(this.state.buscarNome)
      .then(response => {
        this.setState({
          Gastos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { buscarNome, Gastos, currentGasto, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar pelo nome"
              value={buscarNome}
              onChange={this.onChangeBuscarNome}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.buscarNome}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de Gastos</h4>

          <ul className="list-group">
            {Gastos &&
              Gastos.map((gastos, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveGasto(gastos, index)}
                  key={index}
                >
                  {gastos.nome}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllGastos}
          >
            Remover Todos
          </button>
        </div>
        <div className="col-md-6">
          {currentGasto ? (
            <div>
              <h4>Dados do Gasto</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentGasto.nome}
              </div>
              <div>
                <label>
                  <strong>Valor:</strong>
                </label>{" "}
                {currentGasto.valor}
              </div>
              <div>
                <label>
                  <strong>Data:</strong>
                </label>{" "}
                {currentGasto.data}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentGasto.pago ? "Pago" : "Devendo"}
              </div>

              <Link
                to={"/gastos/" + currentGasto.id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Por favor selecione um gasto...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
