import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)

  console.log('received anecdotes from server', response.data)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(url, { content, votes: 0 })

  console.log('created new anecdote:', response.data)
  return response.data
}

const updateAnecdote = async (id, anecdote) => {
  console.log("try to put:", anecdote)
  const response = await axios.put(url + '/' + id, {
    ...anecdote,
    votes: anecdote.votes + 1
  })
  console.log('updated anecdote:', response.data)
  return response.data
}

export default { getAll, createNew, updateAnecdote }