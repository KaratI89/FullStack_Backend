const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('users', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async(request, response) => {  
  const blog = new Blog(request.body)

  const user = request.user

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

blogsRouter.delete('/:id', middleware.userExtractor, async(request, response) => {
  const user = request.user
  console.log(user);
  
  const DbBlogObj = await Blog.findById(request.params.id)
  if (!(DbBlogObj)) {
    response.status(401).json({ error: 'wrong blog ID' })
  }

  const userId = DbBlogObj.users.toString()
  if (!(user.id === userId)) {
    response.status(401).json({ error: 'wrong user' })
  }

  const DbUser = await User.findById(userId)
  DbUser.blogs = DbUser.blogs.filter(blog => blog.id !== request.params.id)
  await DbUser.save()

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