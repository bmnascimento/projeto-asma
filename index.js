const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fs = require('fs')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser())

const notes = JSON.parse(fs.readFileSync('notes.json'))

const notes_page = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="/main.css" />
  <script type="text/javascript" src="main.js"></script>
</head>
<body>
  <div class='container'>
    <h1>IMC</h1>
    <div id='imc'>
    </div>
    <form action='/new_note' method='POST'>
      <label>Peso (kg):</label>
      <input type="text" name="peso"><br>
      <label>Altura (cm):</label>
      <input type="text" name="altura"><br>
      <input type="submit" value="Save">
    </form>
  </div>
</body>
</html>
`

app.get('/', (req, res) => {
  res.send(notes_page)
})

app.get('/reset', (req, res) => {
  notes.splice(0, notes.length)
  res.status(201).send({ message: 'notes reset' })
})

app.get('/data.json', (req, res) => {
  res.json(notes)
})

app.post('/new_note', (req, res) => {
  notes.push( { 
    peso: req.body.peso,
    altura: req.body.altura
  })

  fs.writeFileSync('./notes.json', JSON.stringify(notes))
  
  res.redirect('/')
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))