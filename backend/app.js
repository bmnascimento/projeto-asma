const config = require('./utils/config.js')
const express = require('express')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const morgan = require('morgan')

const patientsRouter = require('./routes/patients')
const sintomasRouter = require('./routes/sintomas')
const fitbitAuthRouter = require('./routes/fitbitAuth')
const usuariosRouter = require('./routes/usuarios')
const loginRouter = require('./routes/login')

const db = require('./models')

const app = express()

logger.info('Connecting to', config.PGURI)
db.sequelize.sync()

app.use(morgan('dev'))
app.use(express.static('build'))
app.use(express.json())

app.use('/api/patients', patientsRouter)
app.use('/api/sintomas', sintomasRouter)
app.use('/api/usuarios', usuariosRouter)
app.use('/api/login', loginRouter)

app.use('/auth/fitbit', fitbitAuthRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
