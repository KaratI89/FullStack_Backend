const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
  })

blogSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

  module.exports = mongoose.model('Blog', blogSchema)