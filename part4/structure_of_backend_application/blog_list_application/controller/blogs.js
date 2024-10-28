const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('users', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  const usersDb = await User.find({})

  if (blog.likes === undefined) {
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).json('error')
    }
  
    const wholeBlogObject = new Blog({ 
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: 0,
      users: usersDb[0].id
    })
    savedBlog = await wholeBlogObject.save()
    return response.status(201).json(savedBlog)
  }
blog.users = usersDb[0].id
savedBlog = await blog.save()
usersDb[0].blogs = usersDb[0].blogs.concat(savedBlog._id)
await usersDb[0].save()
response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async(request,response) => {
  const changedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
    }
  const updtaedBlog = await Blog.findByIdAndUpdate(request.params.id, changedBlog, {new : true} )
  response.json(updtaedBlog)
})

module.exports = blogsRouter