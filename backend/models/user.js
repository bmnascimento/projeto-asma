module.exports = (sequelize, Sequelize) => {
  return(sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: Sequelize.STRING
    }
  }, {
    // options
  }))
}
