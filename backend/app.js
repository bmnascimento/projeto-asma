const config = require('./utils/config.js')
const express = require('express')
const logger = require('./utils/logger')

const app = express()

logger.info('Connecting to', config.PGURI)

app.use(express.static('build'))
app.use(express.json())

patients = [
  {
    id: 0,
    name: 'José Silva',
    phone: '(11) 99999-9999'
  },
  {
    id: 1,
    name: 'Anderson',
    phone: '(11) 9888-8888'
  }
]

app.get('/api/patients', (request, response) => {
  response.json(patients)
})

app.get('/api/patients/:id', (request, response) => {
  const id = Number(request.params.id)
  const patient = patients.find(patient => patient.id === id)

  if (patient) {
    response.json(patient)
  } else {
    response.status(404).end()
  }
})

app.post('/api/patients', (request, response) => {
  logger.info(request.body)

  if (!request.body.name) {
    return response.status(400).json({ error: 'name missing' })
  } else if (!request.body.phone) {
    return response.status(400).json({ error: 'phone missing' })
  } else if (patients.find(patient => patient.name === request.body.name)) {
    return response.status(400).json({ error: 'name must be unique' })
  }

  const patient = {
    id: patients.length,
    name: request.body.name,
    phone: request.body.phone
  }

  patients = patients.concat(patient)

  response.json(patient)
})

app.delete('/api/patients/:id', (request, response) => {
  const id = Number(request.params.id)
  patients = patients.filter(patient => patient.id !== id)

  response.status(204).end()
})

app.put('/api/patients/:id', (request, response) => {
  const id = Number(request.params.id)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

module.exports = app
