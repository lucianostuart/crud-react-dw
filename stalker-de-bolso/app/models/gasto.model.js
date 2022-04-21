module.exports = (sequelize, Sequelize) => {
    const Gasto = sequelize.define("gasto", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING
      },
      valor: {
          type: Sequelize.FLOAT
      },      
      data: {
        type: Sequelize.DATEONLY
      },
      pago: {
        type: Sequelize.BOOLEAN
      }
    });
    return Gasto;
  };