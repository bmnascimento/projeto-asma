const sintomasRouter = require('express').Router()
const db = require('../models')

sintomasRouter.get('/:id', (request, response, next) => {
  const id = Number(request.params.id)

  db.Sintomas.findAll({ 
    where: {patientId: id},
    order: [
      ['dia', 'DESC'],
    ]
  })
    .then(sintomas => {
      if (sintomas === []) {
        response.status(404).send({ error: 'resource not found' })
      } else {
        response.json(sintomas)
      }
    })
    .catch(error => next(error))
})


sintomasRouter.post('/:id', (request, response, next) => {

  const id = Number(request.params.id)

  const newSintoma = {
    dia: request.body.dia,
    tosse: request.body.tosse,
    chiado: request.body.chiado,
    faltaDeAr: request.body.faltaDeAr,
    acordar: request.body.acordar,
    bombinha: request.body.bombinha,
    patientId: id,
  }

  db.Sintomas.create(newSintoma) 
    .then(sintoma => {
      response.json(sintoma)
    })
    .catch(error => next(error))
})

/*
sintomasRouter.delete('/:id', (request, response, next) => {
  const id = Number(request.params.id)
  
  db.Sintomas.destroy({ where: { id } })
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

sintomasRouter.put('/:id', (request, response, next) => {
  const id = Number(request.params.id)

  const patient = {
    name: request.body.name,
    phone: request.body.phone
  }

  db.Sintomas.update(patient, { where: { id } })
    .then(() => {
      response.json(patient)
    })
    .catch(error => next(error))
})
*/

module.exports = sintomasRouter