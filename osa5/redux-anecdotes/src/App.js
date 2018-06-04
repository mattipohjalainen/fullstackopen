import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newAnecdote: ""
    }
  }

  vote = (anecdoteId) => {
    return () => {
      console.log("vote clicked", anecdoteId)
    store.dispatch({ type: "VOTE", id: anecdoteId})
    }
  }

  add = (event) => {
    event.preventDefault()
      console.log("Create clicked")
      store.dispatch({ type: "NEW", content: this.state.newAnecdote})
  }

  handleAnecdoteChange = (event) => {
    this.setState({ newAnecdote: event.target.value })
  }

  render() {
    const anecdotes = store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote( anecdote.id )}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.add}>
          <div>
            New anecdote
            <input 
            type="text"
            value={this.state.newAnecdote}
            onChange={this.handleAnecdoteChange}
            />
            </div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

export default App