import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  console.log("anecdoteReducer... type:", action.type)
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: action.votes } ]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.data.content, id: action.data.id, votes: 0 }]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  console.log("leaving anecdoteReducer, store:", store)
  return store
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(
      anecdote.id,
      anecdote
    )
    dispatch({
      type: 'VOTE',
      id: updatedAnecdote.id, votes: updatedAnecdote.votes
    })
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer