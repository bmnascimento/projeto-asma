const config = require('../utils/config.js')
const patientsDataRouter = require('express').Router()
const db = require('../models')
const axios = require('axios')

patientsDataRouter.get('/:id/:date', async (request, response, next) => {
  const id = Number(request.params.id)
  const date = request.params.date

  try {
    const patient = await db.Patient.findByPk(id, { attributes: ['accessToken'] })

    if (patient.accessToken) {
      const accessToken = config.oauth2.createToken(JSON.parse(patient.accessToken))

      if (accessToken.expired()) {
        const refreshParams = {
          scope: 'activity profile',
        }
        accessToken = await accessToken.refresh(refreshParams)
      }

      const fitbitResponse = await axios.get(`https://api.fitbit.com/1/user/${accessToken.token.user_id}/activities/date/${date}.json`, {
        headers: {
          Authorization: 'Bearer ' + accessToken.token.access_token
        }
      })

      response.json(fitbitResponse.data)
    }

  } catch (error) {
    next(error)
  }
})

module.exports = patientsDataRouter
