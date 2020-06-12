const config = require('../utils/config.js')
const patientsDataRouter = require('express').Router()
const db = require('../models')
const axios = require('axios')

patientsDataRouter.get('/:id/:date', (request, response, next) => {
  const id = Number(request.params.id)
  const date = request.params.date

  db.Patient.findByPk(id, { attributes: ['fitbitId', 'accessToken', 'refreshToken'] })
    .then(patient => {
      if (patient.fitbitId !== '') {
        axios.get(`https://api.fitbit.com/1/user/${patient.fitbitId}/activities/date/${date}.json`, {
          headers: {
            Authorization: 'Bearer ' + patient.accessToken
          }
        })
          .then(fitbitResponse => {
            response.json(fitbitResponse.data)
          })
          .catch(error => {
            if (error.response.status === 401) {
              axios.post(`https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${patient.refreshToken}`, {}, {
                headers: {
                  Authorization: 'Basic ' + Buffer.from(`${config.FITBIT_CLIENT_ID}:${config.FITBIT_CLIENT_SECRET}`).toString('base64'),
                  'content-type': 'application/x-www-form-urlencoded'
                }
              })
                .then(fitbitRefreshResponse => {
                  console.log(fitbitRefreshResponse.data)
                  db.Patient.update({ accessToken: fitbitRefreshResponse.data.access_token }, { where: { id } })
                    .then(updatedPatient => {
                      axios.get(`https://api.fitbit.com/1/user/${updatedPatient.fitbitId}/activities/date/${date}.json`, {
                        headers: {
                          Authorization: 'Bearer ' + updatedPatient.accessToken
                        }
                      })
                        .then(fitbitUpdatedResponse => {
                          response.json(fitbitUpdatedResponse.data)
                        })
                        .catch(error => next(error.response.data))
                    })
                })
                .catch(error => next(error))
            }
          })
      }
    })
    .catch(error => next(error))
})

module.exports = patientsDataRouter
