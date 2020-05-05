const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.send('Hello World')
})

PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})

