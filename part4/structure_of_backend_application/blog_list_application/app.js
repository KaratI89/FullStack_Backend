const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require ('./utils/logger')
require ('express-async-errors')
const blogsRouter = require('./controller/blogs')
const usersRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')


  mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info(`Connect to MongoDB ${config.MONGODB_URI}`))
    .catch((error) => logger.error('error connection to mongodb', error.message))

  app.use(cors())
  app.use(express.json())

  app.use('/api/blogs', blogsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/login', loginRouter)

  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)

  module.exports = app