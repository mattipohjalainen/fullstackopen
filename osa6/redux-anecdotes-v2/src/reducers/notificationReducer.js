const notificationReducer = (store = '', action) => {
  //console.log('notificationReducer...')
  switch (action.type) {
  case 'ADD':
    //console.log('notification data:', action.data)
    return action.data
  default:
    //console.log('default handling, store: ', store)
    return store
  }
}

export const notify = (message, duration) => {
  //console.log('create message to store:', message)
  return async (dispatch) => {
    await dispatch({
      type: 'ADD',
      data: message
    })
    await setTimeout(() => {
      //console.log("timeout...")
      dispatch({
        type: 'ADD',
        data: ''
      })
    }, duration * 1000)

  }
}

export const messageCreation = (message) => {
  //console.log("create message to store:", message)
  return {
    type: 'ADD',
    data: {
      message
    }
  }
}

export default notificationReducer

