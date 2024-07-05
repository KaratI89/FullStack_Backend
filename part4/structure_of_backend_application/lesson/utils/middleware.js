const logger = require('./logger')

const requestLoger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:', req.path)
  console.log('Body:', req.body)
  console.log('---')
  next()
}

const unknownEndpoint = (req, res) => {
    response.status(400).send({error: 'unknown endpoint' })
}

