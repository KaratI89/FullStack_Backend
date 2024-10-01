const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require ('./utils/logger')
const blogsRouter = require('./controller/blogs')

  mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info(`Connect to ${config.MONGODB_URI}`))
    .catch((error) => logger.error('error connection to mongodb', error.message))

  app.use(cors())
  app.use(express.json())

  app.use('/api/blogs', blogsRouter)

  module.exports = app