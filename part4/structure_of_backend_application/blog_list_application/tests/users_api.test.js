const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const User = require('../models/user')

api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const userObject = new User(helper.initialUsers[0])
  await userObject.save()
  // console.log('cleaned');
})

describe('Request with a missing username', () => {
  test('Returned a Bad request code', async () => {
    newUser = {
      password: 'qwerty',
      name: 'Kaleef'
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    // console.log(result.statusCode);
    
  })
  
  test('Returned an error massage', async () => {  
    newUser = {
      password: 'qwerty',
      name: 'Kaleef'
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
    // console.log(result.body.error);
    
    assert.strictEqual(result.body.error, 'User validation failed: username: Path `username` is required.')
  })
  
  test('User was not created', async () => {
    const usersAtStart = await helper.usersInDb()
    
    newUser = {
      password: 'qwerty',
      name: 'Kaleef'
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
  
    const usersAtEnd = await helper.usersInDb()
    // console.log(usersAtStart.length, usersAtEnd.length);
    
    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })  
})

describe('Request with a non-unique username', () => {
  test('Returned a Bad request code', async () => {
    newUser = {
      username: 'Kaleef_89',
      password: 'qwerty',
      name: 'Kaleef'
        }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    // console.log(result.statusCode);
    
  })

  test('Returned an error massage', async () => {  
    newUser = {
      username: 'Kaleef_89',
      password: 'qwerty',
      name: 'Kaleef'
        }

    const result = await api
      .post('/api/users')
      .send(newUser)
    // console.log(result.body.error);

    assert(result.body.error.includes('username should be unique'))
  })

  test('Users was not created', async () => {
    const usersAtStart = await helper.usersInDb()

    newUser = {
      username: 'Kaleef_89',
      password: 'qwerty',
      name: 'Kaleef'
        }

    const result = await api
      .post('/api/users')
      .send(newUser)

    const usersAtEnd = await helper.usersInDb()
    // console.log(usersAtStart);
    // console.log(usersAtEnd);

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

describe('Request with a short password', () => {
  test('Returned a Bad request code', async () => {
    newUser = {
      username: 'Shura_78',
      password: '1',
      name: 'Alexandra'
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    // console.log(result.statusCode);
    
  })

  test('Returned an error massage', async () => {  
    newUser = {
      username: 'Shura_78',
      password: '1',
      name: 'Alexandra'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
    // console.log(result.body.error);

    assert(result.body.error.includes( 'password should be at least 3 characters' ))
  })

  test('Users was not created', async () => {
    const usersAtStart = await helper.usersInDb()

    newUser = {
      username: 'Shura_78',
      password: '1',
      name: 'Alexandra'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)

    const usersAtEnd = await helper.usersInDb()
    // console.log(usersAtStart);
    // console.log(usersAtEnd);

    assert.strictEqual(usersAtStart.length, usersAtEnd.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})