const express = require('express') // определяться должно только так иначе будет ошибка
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let people = [
    { 
        id: 1,
        name: "Arto Hellas", 
        number: "040-123456"
    },
    { 
        id: 2,
        name: "Ada Lovelace", 
        number: "39-44-5323523"
    },
    { 
        id: 3,
        name: "Dan Abramov", 
        number: "12-43-234345"
    },
    { 
        id: 4,
        name: "Mary Poppendieck", 
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(people)
})
app.get('/info', (request, response) =>{
    const getPersonNumber = people.length
    const getData = new Date()
    response.send(`Phone book has info for ${getPersonNumber} people</br> ${getData}`)
})

app.get('/api/person/:id', (request, response) => {
    const id = Number(request.params.id)
    person = people.find(person=> person.id === id)
    if (person) {
        return response.json(person)
    }
    else {
        response.statusMessage = 'Person not found'
        response.status(404).end()
    }
})

app.delete('/api/person/:id', (request, response) => {
    const id = Number(request.params.id)
    people = people.filter(person=> person.id !== id)
    response.status(204).end()
})

const getRandomId = () => {
    const min = Math.ceil(1)
    const max = Math.floor(999999)
    return Math.floor(Math.random() * (max - min) + min)
}

app.post('/api/persons', (request, response) => {
    const personData = request.body
    //console.log(people.find(person => person.name === personData.name));
    if(
        !personData.name 
        || !personData.number 
        || people.find(person => person.name === personData.name)
        || people.find(person => person.number === personData.number)
    ) {
        return response.status(400).json({error: 'content is wrong'})
    }
    const person = {
        id: getRandomId(),
        name: personData.name ,
        number: personData.number
    }
    people = people.concat(person)
    response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})