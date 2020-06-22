require('dotenv').config()

const PORT = process.env.PORT
const PGURI = process.env.PGURI
const FITBIT_CLIENT_ID = process.env.FITBIT_CLIENT_ID
const FITBIT_CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET
const NODE_ENV = process.env.NODE_ENV

const { AuthorizationCode } = require('simple-oauth2')

const oauthConfig = {
  client: {
    id: FITBIT_CLIENT_ID,
    secret: FITBIT_CLIENT_SECRET
  },
  auth: {
    tokenHost: 'https://api.fitbit.com',
    authorizeHost: 'https://www.fitbit.com',
    authorizePath: '/oauth2/authorize',
    tokenPath: '/oauth2/token',
    revokePath: '/oauth2/revoke'
  }
}

const oauth2 = new AuthorizationCode(oauthConfig)

module.exports = {
  PORT,
  PGURI,
  FITBIT_CLIENT_ID,
  FITBIT_CLIENT_SECRET,
  NODE_ENV,
  oauth2
}
