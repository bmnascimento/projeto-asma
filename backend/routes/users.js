const usersRouter = require('express').Router()
const logger = require('../utils/logger')
const db = require('../models')
const usersRouter = require('./routes/users')

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll()
  logger.info(users.toJSON())
})

module.exports = usersRouter
