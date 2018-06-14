const reducer = (state = null, action) => {
    switch (action.type) {
    case 'NOTIFY':
      return action.content
    case 'CLEAR':
      return null
    default:
      return state
    }
  }
  
  export const notifyWith = (message, type, dispatch) => {
    dispatch({
      type: 'NOTIFY',
      content: {
        message, type
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, 5000)
  }
  
  export const notify = (content) => {
    return async (dispatch) => {
      dispatch({
        type: 'NOTIFY',
        content
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR'
        })
      }, 5000)
    }
  }
  
  export default reducer