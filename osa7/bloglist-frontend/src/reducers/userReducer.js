import loginService from '../services/login'
import blogService from '../services/blogs'
import { notifyWith } from './notificationReducer'

const initial = {
  usernme: '',
  password: '',
  user: null
}

const userReducer = (state = initial, action) => {
  switch (action.type) {
  case 'SET_USER':
    return {
      user: action.user,
      username: '',
      password: ''
    }
  case 'USERNAME_UPDATE':
    return {
      ...state,
      username: action.username
    }
  case 'PASSWORD_UPDATE':
    return {
      ...state,
      password: action.password
    }
  case 'LOGOUT':
    return { ...state, user: null }
  default:
    return state
  }
}

export const  updateLoginForm = ({ username, password }) => {
  if ( username ) {
    return {
      type: 'USERNAME_UPDATE',
      username
    }
  }
  return {
    type: 'PASSWORD_UPDATE',
    password
  }
}

export const setLoggedUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}
export const logout = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    window.localStorage.removeItem('loggedBlogAppUser')

    if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        notifyWith(`${user.name} logged out`, 'info', dispatch)
    } else {
        notifyWith('logged out', 'info', dispatch)
    }

    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const login = ({ username, password }) => {

  return async (dispatch) => {
    try{
      const user = await loginService.login({
        username, password
      })
      dispatch({
        type: 'SET_USER',
        user
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      notifyWith(`welcome back ${user.name}!`, 'info', dispatch)
    } catch(e) {
      notifyWith('username or password wrong', 'info', dispatch)
    }


  }
}

export default userReducer