module.exports = (sequelize, Sequelize) => {
  return(sequelize.define('sintoma', {
    dia: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    tosse: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    chiado: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    faltaDeAr: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    acordar: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    bombinha: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  }, {
    // options
  }))
}
