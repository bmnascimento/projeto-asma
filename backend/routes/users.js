const usersRouter = require('express').Router()
const db = require('../models')
const logger = require('../utils/logger')

usersRouter.get('/', async (request, response) => {
  const users = await User.findAll()
  logger.info(users.toJSON())
})

module.exports = usersRouter
