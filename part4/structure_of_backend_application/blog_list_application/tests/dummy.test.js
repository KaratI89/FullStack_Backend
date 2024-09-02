const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  assert.strictEqual(listHelper.dummy(blogs), 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
    title: 'Go to statement Considered Hurmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://',
    likes: 55,
    },
    {
      title: 'Go to statement Considered Hurmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://',
      likes: 5,
    },
    {
      title: 'Go to statement Considered Hurmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://',
      likes: 10,
    }
  
  ]

  test('when list has only one blog, equals the kikes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 70)
  })
})