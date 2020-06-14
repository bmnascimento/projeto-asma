const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const db = require('../models')

loginRouter.post('/', async (request, response, next) => {
  try {
    const usuario = await db.Usuarios.findOne({ where: { email: request.body.email } })
    const passwordCorrect = usuario === null
      ? false
      : await bcrypt.compare(request.body.password, usuario.passwordHash)

    if (!(usuario && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid email or password'
      })
    }

    const token = jwt.sign({
      email: usuario.email,
      id: usuario.id,
    }, process.env.SECRET)

    response
      .status(200)
      .send({ token, email: usuario.email })

  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter