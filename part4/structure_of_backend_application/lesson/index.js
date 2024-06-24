const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// const PORT = process.env.PORT
app.listen(config.PORT, () => {
  logger(`Server running on port ${config.PORT}`)
  // console.log(`Server running on port ${PORT}`)
})
