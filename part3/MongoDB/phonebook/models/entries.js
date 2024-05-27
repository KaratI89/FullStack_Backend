const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connection to', url)

mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(result => console.log('connection to MongoDB'))
  .catch(error => console.log('error connection to mongoDB', error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: (number) => {
        return number.length > 9 && /\d{2,3}-\d+/.test(number)
      },
      message: 'Number should be the 123-45678 format'
    },
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person', personSchema)