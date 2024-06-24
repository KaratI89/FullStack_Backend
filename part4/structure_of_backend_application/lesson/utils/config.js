require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
module.export = {
  MONGODB_URI,
  PORT
}