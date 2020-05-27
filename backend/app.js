const config = require('./utils/config.js')
const express = require('express')
const passport = require('passport')
const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const patientsRouter = require('./routes/patients')
const patientsDataRouter = require('./routes/dataPatients')
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
    callbackURL: "https://young-hollows-35414.herokuapp.com/auth/fitbit/callback"
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
app.use('/api/patients/data', patientsDataRouter)

app.get('/auth/fitbit', passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile','sleep','weight'] }))

app.get('/auth/fitbit/callback',
  passport.authenticate('fitbit', {
    successRedirect: '/',
    failureRedirect: '/auth/fitbit/failure'
}))

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
