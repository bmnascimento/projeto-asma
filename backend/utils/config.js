require('dotenv').config()

const PORT = process.env.PORT
const PGURI = process.env.PGURI
const FITBIT_CLIENT_ID = process.env.FITBIT_CLIENT_ID
const FITBIT_CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET
const NODE_ENV = process.env.NODE_ENV

module.exports = {
  PORT,
  PGURI,
  FITBIT_CLIENT_ID,
  FITBIT_CLIENT_SECRET,
  NODE_ENV
}
