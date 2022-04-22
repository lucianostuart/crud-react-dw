const db = require("../models");
const Gasto = db.gastos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const gasto = {
      nome: req.body.nome,
      valor: req.body.valor,
      data: req.body.data,
      pago: req.body.pago,
    };

    Gasto.create(gasto)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Opa, algum erro ocorreu enquanto criava o gasto"
        });
      });
  };

exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;
  
  Gasto.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Algum erro ocorreu enquanto procuravamos os seus gastos."
        });
      });
  };

exports.findOne = (req, res) => {
  const id = req.params.id;
  Gasto.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else { 
        res.status(404).send({
          message: `Não foi possivel encontrar o gasto com id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel encontrar o gasto com id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Gasto.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Gasto atualizado com sucesso"
        });
      } else {
        res.send({
          message: `Não foi possivel atualizar o gasto com id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel atualizar o gasto com id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Gasto.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Gasto foi removido com sucesso!"
        });
      } else {
        res.send({
          message: `Não foi possivel remover o gasto no id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Não foi possivel remover o gasto no id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Gasto.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Gastos foram deletados!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "erro!"
      });
    });
};
