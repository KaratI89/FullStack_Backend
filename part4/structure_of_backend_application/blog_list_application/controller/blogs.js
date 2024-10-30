const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('users', {username: 1, name: 1})
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith( 'Bearer' )) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  const tokenObject = getTokenFrom(request)

  const decodedToken = jwt.verify(tokenObject, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (blog.likes === undefined) { 
    const wholeBlogObject = new Blog({ 
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: 0,
      users: user.id
    })
    savedBlog = await wholeBlogObject.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return response.status(201).json(savedBlog)
  }
blog.users = user.id
savedBlog = await blog.save()
user.blogs = user.blogs.concat(savedBlog._id)
await user.save()
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