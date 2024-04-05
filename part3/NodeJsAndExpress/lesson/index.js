const express = require('express')
const cors = require('cors')
const app = express()

const requestLoger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Body:', req.body);
    console.log('---');
    next()
}

const unknownEndepoint = (req, res) => {
    res.status(400).send({error: 'unknown endepoint'})
}

app.use(express.json())
app.use(requestLoger)
app.use(cors())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most impottant mithods of HTTP protocol",
        important: true
    }
]
app.get('/', (request, response) => {
    response.send('<h1>Hello</h1>')
})

app.get('/api/notes/', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    const note = notes.find(note => {
        console.log(note.id, typeof note.id, typeof id, note.id === id);
        return note.id === id
    })
    if (note) {
        response.json(note)
    }
    else {
        response.statusMessage = "Not found message"
        response.status(404).end()
    }
    console.log(note);
    //response.json(note) повторный вызов  давал ошибку: Cannot set headers after they are sent to the client
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    notes = notes.filter(note => note.id !== id)
    console.log(notes);
    response.status(204).end()
})

const generatedId = () => {
    const maxId = notes.length > 0 
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) =>{
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        content: body.content,
        important: body.important || false,
        id: generatedId(),
    }
    notes = notes.concat(note)
    response.json(note)
})
app.use(unknownEndepoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
