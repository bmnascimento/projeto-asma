const config = require('../utils/config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.PGURI)

module.exports = {
  Sequelize,
  sequelize,
  Patient: require('./patients.js')(sequelize, Sequelize)
}

