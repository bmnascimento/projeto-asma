const logger = require('./logger')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'página não encontrada' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error)
  
  if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({ error: error.message })
  }
}

module.exports = {
  unknownEndpoint,
  errorHandler
}
