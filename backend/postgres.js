config = require('./utils/config.js')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.PGURI)

sequelize
  .authenticate()
  .then(() => {
    console.log('Success')
    sequelize
      .close()
      .then(() => console.log('Closed'))
      .catch(() => console.log('Couldnt close'))
  })
  .catch(() => console.log('Couldnt connect'))
