const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('connection to', url);

mongoose.connect(url)
    .then(result => {
        console.log('connection to MongoDB')
    })
    .catch(error => {
        console.log('error connection to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
//  notes: [
    //{
    content: String,
    important: Boolean,
    //},
//  ]
})
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Note', noteSchema)
