const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.send('Hello World')
})

PORT = 3001
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})

