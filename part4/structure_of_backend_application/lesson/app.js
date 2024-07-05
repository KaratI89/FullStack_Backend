const express = require('express')
const cors = require('cors')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/notes')


app.use(express.json())
app.use(requestLoger)
app.use(cors())
app.use(express.static('dist'))

app.use('/api/notes', notesRouter)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

module.exports = app
//for test
