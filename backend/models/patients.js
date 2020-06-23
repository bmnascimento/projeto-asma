module.exports = (sequelize, Sequelize) => {
  return(sequelize.define('patient', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING
    },
    height: {
      type: Sequelize.INTEGER
    },
    weight: {
      type: Sequelize.INTEGER
    },
    rghg: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    cpf: {
      type: Sequelize.STRING
    },
    birthDate: {
      type: Sequelize.DATE
    },
    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    accessToken: {
      type: Sequelize.TEXT
    },
    metas: {
      type: Sequelize.TEXT
    }
  }, {
    // options
  }))
}
