const config = require('./utils/config.js')
const express = require('express')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware') 
const patientsRouter = require('./routes/patients')
const db = require('./models')

const app = express()

logger.info('Connecting to', config.PGURI)
db.sequelize.sync()

app.use(express.static('build'))
app.use(express.json())

app.use('/api/patients', patientsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
