module.exports = (sequelize, Sequelize) => {
  return(sequelize.define('usuario', {
    rghg: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    // options
  }))
}
