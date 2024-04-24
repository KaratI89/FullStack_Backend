require('dotenv').config()
const express = require('express')
const cors = require('cors')
// const mongoose = require('mongoose')
const Note = require('./models/note')
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
app.use(express.static('dist'))

// const password = process.argv[2]

// const url = `mongodb+srv://karat0zero:${password}@cluster0.5ktkdqh.mongodb.net/noteApp?retryWrites=true&w=majority`

// mongoose.set('strictQuery',false)
// mongoose.connect(url)
// const noteSchema = new mongoose.Schema({
//   notes: [
//     {
//     content: String,
//     important: Boolean,
//     },
//   ]
// })
// noteSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })
// const Note = mongoose.model('Note', noteSchema)

// const note = new Note ({
//     notes: [
//         {
//             id: 1,
//             content: "HTML is easy",
//             important: true
//         },
//         {
//             id: 2,
//             content: "Browser can execute only JavaScript",
//             important: false
//         },
//         {
//             id: 3,
//             content: "GET and POST are the most impottant mithods of HTTP protocol",
//             important: true
//         }  
//     ]
// })

// app.get('/', (request, response) => {
//     response.send('<h1>Hello</h1>')
// })

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})
//     const id = Number(request.params.id)
//     console.log(id);
//     const note = notes.find(note => {
//         console.log(note.id, typeof note.id, typeof id, note.id === id);
//         return note.id === id
//     })
//     if (note) {
//         response.json(note)
//     }
//     else {
//         response.statusMessage = "Not found message"
//         response.status(404).end()
//     }
//     console.log(note);
//    // response.json(note) повторный вызов  давал ошибку: Cannot set headers after they are sent to the client
// })

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     console.log(id);
//     notes = notes.filter(note => note.id !== id)
//     console.log(notes);
//     response.status(204).end()
// })

// const generatedId = () => {
//     const maxId = notes.length > 0 
//         ? Math.max(...notes.map(n => n.id))
//         : 0
//     return maxId + 1
// }

app.post('/api/notes', (request, response) =>{
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({error: 'content missing'})
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
    })
    
    note.save().then(savedNote =>
        response.json(savedNote)
    )
})
app.use(unknownEndepoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})