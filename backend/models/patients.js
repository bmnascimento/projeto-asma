module.exports = (sequelize, Sequelize) => {
  return(sequelize.define('patient', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    phone: {
      type: Sequelize.STRING
    }
  }, {
    // options
  }))
}
