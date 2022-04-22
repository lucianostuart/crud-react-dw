import React, { Component } from "react";
import GastoDataService from "../services/gasto.service";

export default class Gasto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeValor = this.onChangeValor.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.getGasto = this.getGasto.bind(this);
    this.updatePago = this.updatePago.bind(this);
    this.updateGasto = this.updateGasto.bind(this);
    this.deleteGasto = this.deleteGasto.bind(this);

    this.state = {
      currentGasto: {
        id: null,
        nome: "",
        valor: 0.0, 
        data: "",
        pago: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getGasto(this.props.match.params.id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function(prevState) {
      return {
        currentGasto: {
          ...prevState.currentGasto,
          nome: nome
        }
      };
    });
  }

  onChangeValor(e) {
    const valor = e.target.value;
    
    this.setState(prevState => ({
      currentGasto: {
        ...prevState.currentGasto,
        valor: valor
      }
    }));
  }

  onChangeData(e) {
    const data = e.target.value;
    
    this.setState(prevState => ({
      currentGasto: {
        ...prevState.currentGasto,
        data: data
      }
    }));
  }

  getGasto(id) {
    GastoDataService.get(id)
      .then(response => {
        this.setState({
          currentGasto: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePago(status) {
    var data = {
      id: this.state.currentGasto.id,
      nome: this.state.currentGasto.nome,
      valor: this.state.currentGasto.valor,
      data: this.state.currentGasto.data,
      pago: status
    };

    GastoDataService.update(this.state.currentGasto.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentGasto: {
            ...prevState.currentGasto,
            pago: status
          }
        }));
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateGasto() {
    GastoDataService.update(
      this.state.currentGasto.id,
      this.state.currentGasto
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "O gasto foi atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteGasto() {    
    GastoDataService.delete(this.state.currentGasto.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/gastos')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentGasto } = this.state;

    return (
      <div>
        {currentGasto ? (
          <div className="edit-form">
            <h4>Gasto</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={currentGasto.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Valor</label>
                <input
                  type="number"
                  className="form-control"
                  id="valor"
                  value={currentGasto.valor}
                  onChange={this.onChangeValor}
                />
              </div>
              <div className="form-group">
                <label htmlFor="data">Data</label>
                <input
                  type="text"
                  className="form-control"
                  id="data"
                  placeholder="aaaa-mm-dd"
                  value={currentGasto.data}
                  onChange={this.onChangeData}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:  </strong>
                </label>
                {currentGasto.pago ? (<h4 class="text-success">Pago</h4>) : <h4 class="text-danger">Devendo</h4>}
              </div>
            </form>

            {currentGasto.pago ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePago(false)}
              >
                Cancelar Pagamento
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePago(true)}
              >
                Pago
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteGasto}
            >
              Deletar
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateGasto}
            >
              Editar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Clique em um gasto</p>
          </div>
        )}
      </div>
    );
  }
}
