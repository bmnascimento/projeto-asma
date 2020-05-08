const config = require('./utils/config.js')
const express = require('express')
const logger = require('./utils/logger')
const Sequelize = require('sequelize')

const app = express()

logger.info('Connecting to', config.PGURI)
const sequelize = new Sequelize(config.PGURI)
sequelize
  .authenticate()
  .then(() => logger.info('Success'))
  .catch(() => logger.info('Couldnt connect'))

const User = require('./models/user')(sequelize, Sequelize)

app.use(express.static('build'))

module.exports = app
