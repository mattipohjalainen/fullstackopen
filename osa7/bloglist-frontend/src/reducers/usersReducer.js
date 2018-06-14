import userService from '../services/users'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'INITIALIZE':
    return action.users
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    userService.getAll().then(users =>
      dispatch({
        type: 'INITIALIZE',
        users
      })
    )

  }
}

export default reducer