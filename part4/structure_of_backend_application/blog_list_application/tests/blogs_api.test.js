const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blog list return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier is named id', async () => {
  const resultBlogs = await api
    .get('/api/blogs')
    .expect(200)
  // console.log(resultBlogs.body)
  const validName = resultBlogs.body.map(n => Object.keys(n).includes('id')).includes(false)  
  assert(!validName)
})

test('a valid post can be added', async () => {
  const newPost = {
    title: 'Shoping for clothes',
    author: 'Shopaholic',
    url: 'www.shopaholic.com',
    likes: 999999,
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const listBlogInTheEnd = await api.get('/api/blogs')
  // console.log(listBlogInTheEnd.body);
  
  assert.strictEqual(listBlogInTheEnd.body.length, initialBlogs.length + 1)

  assert.strictEqual(listBlogInTheEnd.body[listBlogInTheEnd.body.length - 1].title, newPost.title)
})

test('likes property is defined', async() => {
  const blogWithoutLikes = {
    title: 'Nothing interesting',
    author: 'Joker',
    url: 'www.moodless.com',
  }
  const verifiableBlogs = await api
    .post('/api/blogs')
    .send(blogWithoutLikes)
    .expect(201)

  // console.log(verifiableBlogs.body);
  assert.strictEqual(verifiableBlogs.body.likes, 0)
})

test('missing request properties have a status code Bad Request', async() => {
  const blogWithoutProperties = {
    author: 'DArtagnan',
  }
  const result = await api
    .post('/api/blogs')
    .send(blogWithoutProperties)
    .expect(400)    
  // console.log(result.body);
})

test('the blog was deleted', async() => {
  const blogsAtStart = await Blog.find({})
  const deletedBlog = blogsAtStart.map(blog => blog.toJSON())[0]  
  await api
    .delete(`/api/blogs/${deletedBlog.id}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({})
  // console.log(blogsAtEnd);
  
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('the blog was changed', async() => {
  const blogAtStart = await Blog.find({})
  const changedBlog = {...blogAtStart.map(blog => blog.toJSON())[0], likes: 999}
  const updatedBlog = await api
    .put(`/api/blogs/${changedBlog.id}`)
    .send(changedBlog)
  assert.strictEqual(changedBlog.likes, updatedBlog.body.likes)
})

after(async () => {
  await mongoose.connection.close()
})