const config = require('../utils/config.js')
const patientsRouter = require('express').Router()
const db = require('../models')

patientsRouter.get('/', (request, response, next) => {
  db.Patient.findAll({
    attributes: ['id', 'name', 'phone'],
    order: [
      ['name', 'ASC'],
    ]
  })
    .then(patients => {
      response.send(patients)
    })
    .catch(error => next(error))
})

patientsRouter.get('/:id', async (request, response, next) => {
  const id = Number(request.params.id)

  try {
    patient = await db.Patient.findByPk(id, { attributes: ['id', 'name', 'phone', 'accessToken'] })

    if (patient === null) {
      response.status(404).send({ error: 'resource not found' })
    } else {
      if (patient.accessToken !== null) {
        let token = config.oauth2.createToken(JSON.parse(patient.accessToken))

        if (token.expired()) {
          patient.accessToken = 'expired'
        } else {
          patient.accessToken = token.token.access_token
        }

        response.json({
          id: patient.id,
          name: patient.name,
          phone: patient.phone,
          accessToken: patient.accessToken,
          fitbitId: token.token.user_id
        })
      } else {
        response.json({
          id: patient.id,
          name: patient.name,
          phone: patient.phone,
          accessToken: null,
          fitbitId: null
        })
      }
    }
  } catch (error) {
    next(error)
  }
})

patientsRouter.post('/', (request, response, next) => {
  const newPatient = {
    name: request.body.name,
    phone: request.body.phone
  }

  db.Patient.create(newPatient)
    .then(patient => {
      response.json({
        name: patient.name,
        phone: patient.phone
      })
    })
    .catch(error => next(error))
})

patientsRouter.post('/refresh/:id', async (request, response, next) => {
  const id = Number(request.params.id)

  try {
    patient = await db.Patient.findByPk(id, { attributes: ['accessToken'] })

    if (patient === null) {
      response.status(404).send({ error: 'patient not found' })
    } else if (patient.accessToken === null) {
      response.status(400).send({ error: 'refresh token invalid' })
    } else {
      let token = config.oauth2.createToken(JSON.parse(patient.accessToken))
      token = await token.refresh()
      
      await db.Patient.update({ accessToken: JSON.stringify(token) }, { where: { id } })

      response.json({
        accessToken: token.token.access_token
      })
    }
  } catch (error) {
    next(error)
  }
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
      response.json({
        name: patient.name,
        phone: patient.phone
      })
    })
    .catch(error => next(error))
})

module.exports = patientsRouter
