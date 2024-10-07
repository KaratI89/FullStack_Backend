const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Crafting the nuclear material',
    author: 'Doctor Evil',
    url: 'www.bigBoom.com',
    likes: 666
  },
  {
    title: 'Breeding the ground worms',
    author: 'Foodslier',
    url: 'www.tastyFood.com',
    likes: 1,
    id: 999
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blog list return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('unique identifier is named id', async () => {
  const resultBlogs = await api
    .get('/api/blogs')
    .expect(200)
  console.log(resultBlogs.body)
  const validName = resultBlogs.body.map(n => Object.keys(n).includes('id')).includes(false)  
  assert(!validName)
})

test.only('a valid post can be added', async () => {

})

after(async () => {
  await mongoose.connection.close()
})