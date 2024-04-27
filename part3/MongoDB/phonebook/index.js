require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/entries')
const app = express()

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))


app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})
// app.get('/info', (request, response) =>{
//     const getPersonNumber = people.length
//     const getData = new Date()
//     response.send(`Phone book has info for ${getPersonNumber} people</br> ${getData}`)
// })

// app.get('/api/persons/:id', (request, response) => {
//     Person.findById(request.params.id).then(person => {
//         response.json(person)
//     })
// })

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(200).end()
    })
    .catch(error => next(error))
})

// const getRandomId = () => {
//     const min = Math.ceil(1)
//     const max = Math.floor(999999)
//     return Math.floor(Math.random() * (max - min) + min)
// }

app.post('/api/persons', (request, response) => {
    const personData = request.body

    // if(!personData.name || !personData.number ) {
    //     return response.status(400).json({error: 'name or number is missing'})
    // }

    const person = new Person({
        name: personData.name ,
        number: personData.number
    })
    person.save().then(savedPerson =>
        response.json(savedPerson)
    )
})

app.put('/api/persons/:id', (request, response, next) => {
    const personData = request.body

    const ChangedPerson = {
        name: personData.name,
        number: personData.number
    }
    const DbPerson = {
        name: String,
        number: String
    }
    Person.findById(request.params.id)
    .then(person => {
        DbPerson.name = person.name
    })
    
    // console.log(ChangedPerson.name, typeof ChangedPerson.name);
    // console.log(DbPerson.name, typeof DbPerson.name);
    if (DbPerson.name === ChangedPerson.name) {
    console.log('we are in the if');
    Person.findByIdAndUpdate(request.params.id, ChangedPerson, {new: true})
    .then(updatedPerson => {response.json(updatedPerson)})
    .catch(error => console.log(error))
    }
    })

const errorHandler = (error, request, response, next) => {
     if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
     }
    next(error)
}


app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})