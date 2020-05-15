const patientsRouter = require('express').Router()
const db = require('../models')

patientsRouter.get('/', (request, response, next) => {
  db.Patient.findAll()
    .then(patients => {
      response.send(patients)
    })
    .catch(error => next(error))
})

patientsRouter.get('/:id', (request, response, next) => {
  const id = Number(request.params.id)

  db.Patient.findByPk(id)
    .then(patient => {
      if (patient === null) {
        response.status(404).send({ error: 'resource not found' })
      } else {
        response.json(patient)
      }
    })
    .catch(error => next(error))
})

patientsRouter.post('/', (request, response, next) => {
  const patient = {
    name: request.body.name,
    phone: request.body.phone
  }

  db.Patient.create(patient)
    .then(() => {
      response.json(patient)
    })
    .catch(error => next(error))
})

patientsRouter.delete('/:id', (request, response, next) => {
  const id = Number(request.params.id)
  
  db.Patient.destroy({ where: { id } })
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

patientsRouter.put('/:id', (request, response, next) => {
  const id = Number(request.params.id)

  const patient = {
    name: request.body.name,
    phone: request.body.phone
  }

  db.Patient.update(patient, { where: { id } })
    .then(() => {
      response.json(patient)
    })
    .catch(error => next(error))
})

module.exports = patientsRouter
