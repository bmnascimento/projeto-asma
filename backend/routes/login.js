const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const db = require('../models')

loginRouter.post('/usuario', async (request, response, next) => {
  try {
    const usuario = await db.Usuarios.findOne({ where: { rghg: request.body.rghg } })

    const passwordCorrect = usuario === null
      ? false
      : await bcrypt.compare(request.body.password, usuario.passwordHash)

    if (!(usuario && passwordCorrect)) {
      return response.status(401).json({ error: 'invalid rghg or password' })
    }

    const token = jwt.sign({
      rghg: usuario.rghg,
      id: usuario.id,
    }, process.env.SECRET)

    response
      .status(200)
      .send({ token, rghg: usuario.rghg, name: usuario.name, id: usuario.id })

  } catch (error) {
    next(error)
  }
})

loginRouter.post('/paciente', async (request, response, next) => {
  try {
    const usuario = await db.Patient.findOne({ where: { rghg: request.body.rghg } })

    const passwordCorrect = usuario === null
      ? false
      : await bcrypt.compare(request.body.password, usuario.passwordHash)

    if (!(usuario && passwordCorrect)) {
      return response.status(401).json({ error: 'invalid rghg or password' })
    }

    const token = jwt.sign({
      rghg: usuario.rghg,
      id: usuario.id,
    }, process.env.SECRET)

    response
      .status(200)
      .send({ token, rghg: usuario.rghg, name: usuario.name, id: usuario.id, fitbitId: JSON.parse(usuario.accessToken) ? JSON.parse(usuario.accessToken).user_id : null })

  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter