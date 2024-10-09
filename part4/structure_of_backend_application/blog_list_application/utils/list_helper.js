const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    // console.log(sum);
    // console.log(item.likes);
    return sum + item.likes
  }
  
  return blogs.length === 0 
  ? 0
  : blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  const reducer  = (previous, current) => {
    // console.log('prev',previous );
    // console.log('cur', current);
    return current.likes > previous.likes ? current : previous
  }
  const favoriteBlog = blogs.reduce(reducer,blogs[0])
  // console.log(favoriteBlog);
  return {
    _id: favoriteBlog._id,
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    url: favoriteBlog.url,
    likes: favoriteBlog.likes,
    __v: favoriteBlog.__v
  }
}

module.exports = { dummy , totalLikes, favoriteBlog }