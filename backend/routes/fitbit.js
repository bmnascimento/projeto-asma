const config = require('../utils/config.js')
const axios = require('axios')
const fitbitRouter = require('express').Router()
const db = require('../models')

fitbitRouter.get('/callback', (request, response, next) => {
  const id = request.query.state

  const redirect_uri = config.NODE_ENV === 'development' ? 'http://localhost:3001/auth/fitbit/callback' : 'https://young-hollows-35414.herokuapp.com/auth/fitbit/callback'
  
  axios.post(`https://api.fitbit.com/oauth2/token?client_id=${config.FITBIT_CLIENT_ID}&grant_type=authorization_code&redirect_uri=${redirect_uri}&code=${request.query.code}&state=${id}`, {}, {
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${config.FITBIT_CLIENT_ID}:${config.FITBIT_CLIENT_SECRET}`).toString('base64'),
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
  .then(fitbitResponse => {
    const patient = {
      accessToken: fitbitResponse.data.access_token,
      refreshToken: fitbitResponse.data.refresh_token,
      fitbitId: fitbitResponse.data.user_id
    }

    db.Patient.update(patient, { where: { id } })
    .then(() => {
      response.redirect(`/#/pacientes/${id}/resumo`)
    })
  })
  .catch(error => next(error))
})

fitbitRouter.get('/:id', (request, response) => {
  const redirect_uri = config.NODE_ENV === 'development' ? 'http://localhost:3001/auth/fitbit/callback' : 'https://young-hollows-35414.herokuapp.com/auth/fitbit/callback'
  response.redirect(`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${config.FITBIT_CLIENT_ID}&redirect_uri=${redirect_uri}&scope=activity%20profile&state=${request.params.id}`)
})

module.exports = fitbitRouter