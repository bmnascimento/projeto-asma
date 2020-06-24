module.exports = (sequelize, Sequelize) => {
  return(sequelize.define('sintomaSemanal', {
    freqAcordou: {
      type: Sequelize.INTEGER
    },
    intensidadeSintomas: {
      type: Sequelize.INTEGER
    },
    chiadolimitacao: {
      type: Sequelize.INTEGER
    },
    freqFaltaDeAr: {
      type: Sequelize.INTEGER
    },
    freqChiado: {
      type: Sequelize.INTEGER
    },
    freqBombinha: {
      type: Sequelize.INTEGER
    },
    porcentagemPrevisto: {
      type: Sequelize.INTEGER
    },
  }, {
    // options
  }))
}
