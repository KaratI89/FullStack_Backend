const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const {username, password, name} = request.body

  if ( password === undefined) {
    return response.status(400).json({ error: '"password" has been missed'})
  } else if ( password.length < 3 ) {
    return response.status(400).json({ error: 'password should be at least 3 characters'})
  } 

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get('/', async (request,response) =>{
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1 })
  response.json(users)
})

module.exports = userRouter