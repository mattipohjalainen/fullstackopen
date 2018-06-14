import blogService from '../services/blogs'
import { notifyWith } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    return action.blogs
  case 'CREATE_BLOG':
    return state.concat(action.blog)
  case 'UPDATE_BLOG':
    const updated = state.map(blog => blog.id === action.id ? action.updated : blog)
    //console.log("in reducer, updated:", updated)
    return updated;
  case 'REMOVE_BLOG':
    return state.filter(blog => blog._id !== action.id )
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      blog: createdBlog
    })
    notifyWith(`blog '${createdBlog.title}' created`, 'info', dispatch)
  }
}

export const like = (liked) => {
  return async (dispatch) => {
    const updated = { ...liked, likes: liked.likes + 1 }
    const blog = await blogService.update(liked.id, updated)

    notifyWith(`you liked '${liked.title}'`, 'info', dispatch)

    //console.log("updated blog:", blog)

    dispatch({
      type: 'UPDATE_BLOG',
      updated: blog,
      id: updated.id
    })
  }
}

export const remove = (blog) => {
  return async (dispatch) => {
    const ok = window.confirm(`remove blog '${blog.title}' by ${blog.author}?`)
    if (ok === false) {
      return
    }

    await blogService.remove(blog.id)

    notifyWith(`blog '${blog.title}' removed`, 'info', dispatch)

    dispatch({
      type: 'REMOVE_BLOG',
      id: blog.id
    })
  }
}

export const comment = (commented, comment) => {
  return async (dispatch) => {
    const updated = { ...commented, comments: commented.comments.concat(comment) }
    console.log(updated)
    const blog = await blogService.update(commented.id, updated)

    notifyWith(`you commented '${commented.title}'`, 'info', dispatch)

    dispatch({
      type: 'UPDATE_BLOG',
      updated: blog,
      id: updated.id
    })
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    blogService.getAll().then(blogs =>
      dispatch({
        type: 'INITIALIZE_BLOGS',
        blogs
      })
    )
  }
}

export default reducer