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

/*
User
  .sync({ force: true })
  .then(() => {
    return User.create({
      username: 'jose',
      passwordHash: 'afifhj3u894uij'
    })
  })
  .then(jose => {
    console.log('Jose id:', jose.id)
    return User.findAll()
  })
  .then(users => {
    console.log('All users:', JSON.stringify(users, null, 4))
  })
 */
