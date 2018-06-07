import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { vote } from './../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const doVote = (anecdote, props) => {
  return async () => {
    await props.vote(anecdote)
    await props.notify(`you voted '${anecdote.content}'`, 5)
  }
}

const AnecdoteList = (props) => (
  <div>
    <h2>Anecdotes</h2>
    {props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
              has {anecdote.votes}
          <button onClick = {
            doVote(anecdote, props)
          }>
                vote
          </button>
        </div>
      </div>
    )}
  </div>
)

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter((a) => a.content.includes(filter))
}
const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

export default connect(
  mapStateToProps,
  { 
    vote,
    notify
  }
)(AnecdoteList)

