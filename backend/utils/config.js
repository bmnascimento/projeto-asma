require('dotenv').config()

const PORT = process.env.PORT
const PGURI = process.env.PGURI

module.exports = {
  PORT,
  PGURI
}
