const express = require('express')

const app = express()

app.use(express.static('build'))

PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

