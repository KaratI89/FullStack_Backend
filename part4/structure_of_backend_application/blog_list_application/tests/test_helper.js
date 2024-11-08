const User = require('../models/user')

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
  }
]

const testUsers = [
  {
    username: 'TestUserName',
    password: 'qwerty',
    name: 'TestName'
  }
]

const initialUsers = [
  {
    username: 'Kaleef_89',
    password: 'qwerty',
    name: 'Kaleef'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {usersInDb, initialUsers, initialBlogs, testUsers}