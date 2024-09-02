const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    console.log(sum);
    console.log(item.likes);
    
    
    return sum + item.likes
  }
  return blogs.reduce(reducer,0)
}

module.exports = { dummy , totalLikes }