const bcrypt = require('bcrypt')
const usuariosRouter = require('express').Router()
const db = require('../models')

usuariosRouter.get('/', async (request, response, next) => {
  try {
    const usuarios = await db.Usuarios.findAll()

    response.send(usuarios.map(usuario => ({ id: usuario.id, rghg: usuario.rghg, name: usuario.name, type: usuario.type })))

  } catch (error) {
    next(error)
  }
})

usuariosRouter.post('/', async (request, response, next) => {
  try {
    const passwordHash = await bcrypt.hash(request.body.password, 10)

    const usuario = {
      name: request.body.name,
      rghg: request.body.rghg,
      type: request.body.type,
      passwordHash,
    }

    const usuarioSalvo = await db.Usuarios.create(usuario)

    response.json({
      name: usuarioSalvo.name,
      rghg: usuarioSalvo.rghg,
      type: usuarioSalvo.type
    })

  } catch (error) {
    next(error)
  }
})

module.exports = usuariosRouter
