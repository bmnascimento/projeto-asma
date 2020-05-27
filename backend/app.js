const config = require('./utils/config.js')
const express = require('express')
const axios = require('axios')
const passport = require('passport')
const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy
const logger = require('./utils/logger')
const middleware = require('./utils/middleware') 
const patientsRouter = require('./routes/patients')
const db = require('./models')

const app = express()

logger.info('Connecting to', config.PGURI)
db.sequelize.sync()

app.use(express.static('build'))
app.use(express.json())
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('fitbit', new FitbitStrategy({
    clientID: config.FITBIT_CLIENT_ID,
    clientSecret: config.FITBIT_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/fitbit/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    logger.info('Access Token:', accessToken)
    logger.info('Refresh Token:', refreshToken)
    logger.info('Profile:', profile)
    
    const fitbitId = profile.id

    patient = {
      accessToken,
      refreshToken,
      fitbitId,
      profile: JSON.stringify(profile)
    }

    db.Patient.update(patient, { where: { fitbitId } })
    .then(() => {
      done(null, patient)
    })
    .catch(error => {
      done(error, patient)
    })
  }
))

app.use('/api/patients', patientsRouter)

app.get('/auth/fitbit', passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile','sleep','weight'] }))

app.get('/auth/fitbit/callback',
  passport.authenticate('fitbit', {
    successRedirect: '/',
    failureRedirect: '/auth/fitbit/failure'
}))

app.get('/auth/fitbit/failure', () => '<div class="alert alert-danger" role="alert"> Não foi possível conectar ao Fitbit</div>')

let accessToken = ''

db.Patient.findByPk(12, { attributes: ['accessToken'] })
  .then(patient => {
    axios.get(`https://api.fitbit.com/1/user/8GMKFH/activities/date/2020-05-25.json`, {
      headers: {
        Authorization: 'Bearer ' + patient.accessToken
      }
    })
    .then(response => {
      logger.info('Resposta:', response.data.summary.distances)
    })
    .catch(error => {
      logger.error(error)
    })
  })

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
