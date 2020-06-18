module.exports = (sequelize, Sequelize) => {
  return(sequelize.define('usuario', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rghg: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    // options
  }))
}
