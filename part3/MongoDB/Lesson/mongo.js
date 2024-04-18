const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://karat0zero:${password}@cluster0.5ktkdqh.mongodb.net/noteApp?retryWrites=true&w=majority`

  mongoose.set('strictQuery',false)

  mongoose.connect(url)

  const noteSchema = new mongoose.Schema({
    notes: [
      {
      content: String,
      important: Boolean,
      },
    ]
  })

  const Note = mongoose.model('Note', noteSchema)

  const note = new Note({
    notes: [
      {
        content: 'HTML is easy',
        important: true,
      },
      {
        content: 'MongoDb is fucking shit',
        important: true,
      }
    ]
})

  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  // Note.find({}).then(result => {
  //   result.forEach(note => {
  //     console.log(note)
  //   })
  //   mongoose.connection.close()
  // })