module.exports = (sequelize, Sequelize) => {
  return(sequelize.define('patient', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING
    },
    accessToken: {
      type: Sequelize.TEXT
    }
  }, {
    // options
  }))
}
