const config = require('../utils/config.js')
const axios = require('axios')
const patientsRouter = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')

patientsRouter.get('/', (request, response, next) => {
  db.Patient.findAll({
    attributes: ['id', 'name'],
    order: [
      ['name', 'ASC'],
    ]
  })
    .then(patients => {
      response.send(patients)
    })
    .catch(error => next(error))
})

let refreshingToken = false

patientsRouter.get('/data/:id/:date', async (request, response, next) => {
  const id = Number(request.params.id)
  const date = request.params.date

  try {
    const patient = await db.Patient.findByPk(id, { attributes: ['accessToken'] })

    let token = config.oauth2.createToken(JSON.parse(patient.accessToken))

    if (token.expired() && !refreshingToken) {
      refreshingToken = true
      
      token = await token.refresh()
      await db.Patient.update({ accessToken: JSON.stringify(token) }, { where: { id } })
      
      refreshingToken = false

    } else if (refreshingToken) {
      const waitRefresh = resolve => {
        if (refreshingToken) {
          setTimeout(() => waitRefresh(resolve), 500)
        } else {
          resolve()
        }
      }
      await new Promise(resolve => waitRefresh(resolve))
    }

    const fitbitResponse = await axios.get(`https://api.fitbit.com/1/user/${token.token.user_id}/activities/date/${date}.json`, {
      headers: {
        Authorization: 'Bearer ' + token.token.access_token
      }
    })
    
    response.json(fitbitResponse.data)

  } catch (error) {
    next(error)
  }
})

patientsRouter.get('/:id', async (request, response, next) => {
  const id = Number(request.params.id)

  try {
    const patient = await db.Patient.findByPk(id)

    if (patient === null) {
      response.status(404).send({ error: 'resource not found' })
    } else {
      if (patient.accessToken !== null) {
        let token = JSON.parse(patient.accessToken)

        response.json({
          name: patient.name,
          phone: patient.phone,
          height: patient.height,
          weight: patient.weight,
          rghg: patient.rghg,
          cpf: patient.cpf,
          birthDate: patient.birthDate,
          fitbitId: token.user_id
        })
      } else {
        response.json({
          name: patient.name,
          phone: patient.phone,
          height: patient.height,
          weight: patient.weight,
          rghg: patient.rghg,
          cpf: patient.cpf,
          birthDate: patient.birthDate,
          fitbitId: null
        })
      }
    }
  } catch (error) {
    next(error)
  }
})

patientsRouter.post('/', async (request, response, next) => {
  try {
    const newPatient = {
      name: request.body.name,
      phone: request.body.phone,
      height: request.body.height,
      weight: request.body.weight,
      rghg: request.body.rghg,
      cpf: request.body.cpf,
      birthDate: request.body.birthDate,
      passwordHash: await bcrypt.hash(request.body.password, 10)
    }

    const patient = await db.Patient.create(newPatient)

    response.json({
      name: patient.name,
      phone: patient.phone,
      height: patient.height,
      weight: patient.weight,
      rghg: patient.rghg,
      cpf: patient.cpf,
      birthDate: patient.birthDate,
    })
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

patientsRouter.put('/:id', async (request, response, next) => {
  const id = Number(request.params.id)

  try {
    const patient = {
      name: request.body.name,
      phone: request.body.phone,
      height: request.body.height,
      weight: request.body.weight,
      rghg: request.body.rghg,
      cpf: request.body.cpf,
      birthDate: request.body.birthDate,
      passwordHash: await bcrypt.hash(request.body.password, 10)
    }

    await db.Patient.update(patient, { where: { id } })

    response.json({
      name: request.body.name,
      phone: request.body.phone,
      height: request.body.height,
      weight: request.body.weight,
      rghg: request.body.rghg,
      cpf: request.body.cpf,
      birthDate: request.body.birthDate,
    })
  } catch (error) {
    next(error)
  }
})

module.exports = patientsRouter
