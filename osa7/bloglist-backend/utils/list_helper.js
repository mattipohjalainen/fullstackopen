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

const mostLikes = (blogs) => {
  let mostLikes = {}
  if (blogs.length === 1) {
    mostLikes = {
      author: blogs[0].author,
      likes: blogs[0].likes
    }
  } else if (blogs.length > 1) {
    //console.log("start mostLikes")
    const reducer = (result, current) => {
      //console.log("reducer result in beginning", result)
      //console.log("current author", current.author)
      const index = result.findIndex(item => item.author === current.author)
      if (index !== -1) {
        result[index].likes = result[index].likes + current.likes
      } else {
        //console.log("add new item")
        result.push({ author: current.author, likes: current.likes })
      }
      return result
    }
    const temp = blogs.reduce(reducer, [])

    const anotherReducer = (prev, current) => {
      return (prev.likes > current.likes) ? prev : current
    }
    mostLikes = temp.reduce(anotherReducer, {})

  }
  return mostLikes
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostLikes
}