const sintomasSemanalRouter = require('express').Router()
const db = require('../models')

sintomasSemanalRouter.get('/:id', (request, response, next) => {
  const id = Number(request.params.id)

  db.SintomasSemanal.findAll({
    where: {patientId: id},
  })
    .then(sintomasSemanal => {
      if (sintomasSemanal === []) {
        response.status(404).send({ error: 'resource not found' })
      } else {
        response.json(sintomasSemanal)
      }
    })
    .catch(error => next(error))
})


sintomasSemanalRouter.post('/:id', (request, response, next) => {

  const id = Number(request.params.id)

  const newSintomasSemanal = {

    freqAcordou: request.body.freqAcordou,
    intensidadeSintomas: request.body.intensidadeSintomas,
    chiadolimitacao: request.body.chiadolimitacao,
    freqFaltaDeAr: request.body.freqFaltaDeAr,
    freqChiado: request.body.freqChiado,
    freqBombinha: request.body.freqBombinha,
    patientId: id,
  }

  db.SintomasSemanals.create(newSintomasSemanal)
    .then(sintomasSemanal => {
      response.json(sintomasSemanal)
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

module.exports = sintomasSemanalRouter
