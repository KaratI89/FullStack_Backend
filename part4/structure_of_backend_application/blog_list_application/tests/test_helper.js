const User = require('../models/user')

const initialUsers = [
  {
    username: 'Kaleef_98',
    password: 'qwerty',
    name: 'Kaleef'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {usersInDb, initialUsers}