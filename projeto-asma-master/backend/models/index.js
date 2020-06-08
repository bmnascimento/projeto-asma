const config = require('../utils/config')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.PGURI)

const Patient = require('./patients.js')(sequelize, Sequelize)
const DadosDiarios = require('./dadosDiarios.js')(sequelize, Sequelize)
const Sintomas = require('./sintomas.js')(sequelize, Sequelize)

Patient.hasMany(Sintomas)

module.exports = {
  Sequelize,
  sequelize,
  Patient,
  DadosDiarios,
  Sintomas,
}
