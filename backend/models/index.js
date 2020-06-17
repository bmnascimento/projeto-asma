const config = require('../utils/config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.PGURI)

const Patient = require('./patients.js')(sequelize, Sequelize)
const Sintomas = require('./sintomas.js')(sequelize, Sequelize)
const Usuarios = require('./usuarios')(sequelize, Sequelize)

Patient.hasMany(Sintomas)

module.exports = {
  Sequelize,
  sequelize,
  Patient,
  Sintomas,
  Usuarios
}
