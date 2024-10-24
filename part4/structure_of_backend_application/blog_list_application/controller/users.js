const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const {username, password, name} = request.body

  if ( username === undefined || password === undefined) {
    return response.status(400).json({ error: '"username" or "password" has been missed'})
  } else if ( username.length < 3 || password.length < 3 ) {
    return response.status(400).json({ error: 'password and username must be at least 3 characters'})
  } 

  const retrievedDbUsers = await User.find({})
  if (retrievedDbUsers.map(users => users.username).includes(username)) {
    return response.status(400).json({error: 'username is already taken'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get('/', async (request,response) =>{
  const users = await User.find({})
  response.json(users)
})

module.exports = userRouter