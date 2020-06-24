const config = require('../utils/config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.PGURI, {
  // disable logging; default: console.log
  logging: false,
  dialect: 'postgres'
})

const Patient = require('./patients.js')(sequelize, Sequelize)
const Sintomas = require('./sintomas.js')(sequelize, Sequelize)
const SintomasSemanal = require('./sintomasSemanal')(sequelize, Sequelize)
const Usuarios = require('./usuarios')(sequelize, Sequelize)

Patient.hasMany(Sintomas)
Patient.hasMany(SintomasSemanal)

module.exports = {
  Sequelize,
  sequelize,
  Patient,
  Sintomas,
  SintomasSemanal,
  Usuarios,
  Op: Sequelize.Op
}
