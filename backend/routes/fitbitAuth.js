const config = require('../utils/config.js')
const fitbitAuth = require('express').Router()
const db = require('../models')

const redirectUri = config.NODE_ENV === 'development' ? 'http://localhost:3001/auth/fitbit/callback' : 'https://young-hollows-35414.herokuapp.com/auth/fitbit/callback'

fitbitAuth.get('/callback', async (request, response, next) => {
  const id = request.query.state

  const tokenParams = {
    code: request.query.code,
    redirect_uri: redirectUri,
    scope: 'activity profile',
  }

  try {
    const accessToken = await config.oauth2.getToken(tokenParams)

    const patient = {
      accessToken: JSON.stringify(accessToken),
      fitbitId: accessToken.token.user_id
    }

    await db.Patient.update(patient, { where: { id } })
    
    if (request.query.origin === 'mobile') {
      response.send('Fitbit cadastrado! Você pode retornar ao aplicativo')
    } else {
      response.redirect(`/#/pacientes/${id}/resumo`)
    }

  } catch (error) {
    next(error)
  }
})

fitbitAuth.get('/:id', async (request, response) => {
  const authorizationUri = config.oauth2.authorizeURL({
    redirect_uri: redirectUri,
    scope: 'activity profile',
    state: request.params.id
  })
  
  response.redirect(authorizationUri)
})

module.exports = fitbitAuth