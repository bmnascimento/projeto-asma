const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const db = require('../models')

loginRouter.post('/', async (request, response, next) => {
  try {
    let usuario

    if (request.body.type === 'paciente') {
      usuario = await db.Patient.findOne({ where: { rghg: request.body.rghg } })
    } else if (request.body.type === 'profissional') {
      usuario = await db.Usuarios.findOne({ where: { rghg: request.body.rghg } })
    } else {
      response.status(401).json({ error: 'invalid type' })
    }

    const passwordCorrect = usuario === null
      ? false
      : await bcrypt.compare(request.body.password, usuario.passwordHash)

    if (!(usuario && passwordCorrect)) {
      response.status(401).json({ error: 'invalid rghg or password' })
    }

    const token = jwt.sign({
      rghg: usuario.rghg,
      id: usuario.id,
    }, process.env.SECRET)

    response
      .status(200)
      .send({ token, rghg: usuario.rghg, name: usuario.name, type: request.body.type })

  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter