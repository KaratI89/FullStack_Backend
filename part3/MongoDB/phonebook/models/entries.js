const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connection to', url)

mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(result => console.log('connection to MongoDB'))
    .catch(error => console.log('error connection to mongoDB', error.message))

const personSchema = new mongoose.Schema({
      name: String,
      number: String,
  })

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Person', personSchema)