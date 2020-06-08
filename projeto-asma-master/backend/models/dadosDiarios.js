module.exports = (sequelize, Sequelize) => {
  return(sequelize.define('dadosDiarios', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING
    },
    accessToken: {
      type: Sequelize.STRING
    },
    refreshToken: {
      type: Sequelize.STRING
    },
    fitbitId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    fitbitProfile: {
      type: Sequelize.JSON
    }
  }, {
    // options
  }))
}
