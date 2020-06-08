const config = require('./utils/config')
const app = require('./app')

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`)
})

