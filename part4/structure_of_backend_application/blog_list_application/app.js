const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require ('./utils/logger')
require ('express-async-errors')
const blogsRouter = require('./controller/blogs')
const middleware = require('./utils/middleware')


  mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info(`Connect to ${config.MONGODB_URI}`))
    .catch((error) => logger.error('error connection to mongodb', error.message))

  app.use(cors())
  app.use(express.json())

  app.use('/api/blogs', blogsRouter)

  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)

  module.exports = app