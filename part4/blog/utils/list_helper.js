const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const mostLikes = (blogs) => {
  const reducer = (prev, current) => {
    return prev.likes > current.likes
      ? prev
      : current
  }

  return blogs.length === 0
    ? 0
    : lodash.omit(blogs.reduce(reducer, 0), ['_id', 'url', '__v'])
}

const authorWithMostBlogs = (blogs) => {
  const reducer = (prev, current) => {
    return prev.blogs > current.blogs
      ? prev
      : current
  }

  return blogs.length === 0
    ? null
    : lodash.chain(blogs)
      .groupBy('author')
      .map((value, key) => ({ author: key, blogs: value.length }))
      .value()
      .reduce(reducer, 0)
}

const authorWithMostLikes = (blogs) => {
  const reducer = (prev, current) => {
    return prev.likes > current.likes
      ? prev
      : current
  }

  return blogs.length === 0
    ? null
    : lodash.chain(blogs)
      .groupBy('author')
      .map((value, key) => ({ author: key, likes: totalLikes(value) }))
      .value()
      .reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  authorWithMostBlogs,
  authorWithMostLikes
}