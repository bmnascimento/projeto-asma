module.exports = (sequelize, Sequelize) => {
  return(sequelize.define('usuario', {
    email: {
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
