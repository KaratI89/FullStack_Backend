const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    console.log(sum);
    console.log(item.likes);
    return sum + item.likes
  }
  
  return blogs.length === 0 
  ? 0
  : blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  const reducer  = (previous, current) => {
    console.log('prev',previous );
    console.log('cur', current);
    return current.likes > previous.likes ? current : previous
  }
  console.log(blogs.reduce(reducer,0));
    return blogs.reduce(reducer,0)
}

module.exports = { dummy , totalLikes, favoriteBlog }