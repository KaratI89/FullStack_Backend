const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    require: true
  },
  likes: Number,
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

  })

blogSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

  module.exports = mongoose.model('Blog', blogSchema)