import React, { Component } from "react";
import GastosDataService from "../services/gasto.service";

export default class AddGasto extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.saveGasto = this.saveGasto.bind(this);
    this.newGasto = this.newGasto.bind(this);

    this.state = {
      id: null,
      nome: "",
      valor: 0.0, 
      data: "",
      pago: false
    };
  }

  onChange({target}) {
    this.setState({
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  }

  saveGasto() {
    var data = {
      nome: this.state.nome,
      valor: this.state.valor,
      data: this.state.data,
      pago: this.state.pago
    };

    GastosDataService.create(data)
      .then(response => {
        this.setState({
          nome:  response.data.nome,
          valor: response.data.valor,
          data:  response.data.data,
          pago:  response.data.pago
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newGasto() {
    this.setState({
      id: null,
      nome: "",
      valor: 0.0, 
      data: "",
      pago: false
    });
  }
  

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Gasto salvo com sucesso!!!</h4>
            <button className="btn btn-success" onClick={this.newGasto}>
              Adicionar
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                value={this.state.nome}
                onChange={this.onChange}
                name="nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="valor">Valor:</label>
              <input
                type="number"
                className="form-control"
                id="valor"
                required
                value={this.state.valor}
                onChange={this.onChange}
                name="valor"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="data">Data:</label>
              <input
                type="text"
                className="form-control"
                id="data"
                required
                value={this.state.data}
                onChange={this.onChange}
                name="data"
                placeholder="aaaa-mm-dd"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pago">Pago</label>
              <input
                type="checkbox"
                className="form-control"
                id="pago"
                required
                value={this.state.pago}
                onChange={this.onChange}
                name="pago"
              />
            </div>

            <button onClick={this.saveGasto} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}
