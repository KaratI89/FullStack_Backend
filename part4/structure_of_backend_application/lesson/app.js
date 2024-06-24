const express = require('express')
const cors = require('cors')
const app = express()
const config = require('./utils/config')
const logger = require('./utils/logger')
const notesRouter = require('./controllers/notes')

const requestLoger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('---')
  next()
}

const unknownEndepoint = (req, res) => {
  res.status(400).send({ error: 'unknown endepoint' })
}

app.use(express.json())
app.use(requestLoger)
app.use(cors())
app.use(express.static('dist'))

app.use('/api/notes', notesRouter)

app.use(unknownEndepoint)

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

