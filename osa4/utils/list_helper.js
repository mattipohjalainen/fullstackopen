const dummy = (blogs) => {
  console.log(blogs)

  return 1
}

const totalLikes = (blogs) => {
  console.log("blogs in list:", blogs.length)

  const reducer = (sum, item) => {
    return sum + item.likes
  }
  const totalLikes = blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)

  console.log("total likes in blogs:", totalLikes)

  return totalLikes
}

const favoriteBlog = (blogs) => {
  console.log("blogs in list:", blogs.length)

  const reducer = (prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  }

  const favorite = blogs.length === 0 ? null : blogs.reduce(reducer, blogs[0])

  console.log("favorite:", favorite)

  return favorite

}

module.exports = {
  dummy, totalLikes, favoriteBlog
}