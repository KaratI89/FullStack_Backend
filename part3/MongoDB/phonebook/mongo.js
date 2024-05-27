const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://karat0zero:${password}@cluster0.5ktkdqh.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
  name:   name,
  number: number,
})

if (process.argv.length < 4) {
  Person.find({}).then(result => {
    console.log('Phonebook')
    result.forEach(person => {
      console.log(person.name +' '+ person.number)
    })
    mongoose.connection.close()
  })
}
else {
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}