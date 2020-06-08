const patientsDataRouter = require('express').Router()
const db = require('../models')
const axios = require('axios')

patientsDataRouter.get('/:id/:date', (request, response, next) => {
  const id = Number(request.params.id)
  const date = request.params.date

  db.Patient.findByPk(id, { attributes: ['fitbitId', 'accessToken'] })
  .then(patient => {
    axios.get(`https://api.fitbit.com/1/user/${patient.fitbitId}/activities/date/${date}.json`, {
      headers: {
        Authorization: 'Bearer ' + patient.accessToken
      }
    })
    .then(fitbitResponse => response.json(fitbitResponse.data))
    .catch(error => next(error))
  })
})

module.exports = patientsDataRouter
