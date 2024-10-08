const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  if (blog.likes === undefined) {
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json('error')
    }
    const wholeBlogObject = new Blog({ 
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: 0})
    savedBlog = await wholeBlogObject.save()
    return response.status(201).json(savedBlog)
  }
savedBlog = await blog.save()
response.status(201).json(savedBlog)
})

module.exports = blogsRouter