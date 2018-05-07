import React, { Component } from 'react';
import './App.css';
import MostVotes from './MostVotes'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: this.generateNumber(),
      pisteet: [0, 0, 0, 0, 0, 0]
    }
  }
  generateNumber = () => {
    return Math.floor(Math.random() * (5 + 1));
  }

  render() {
    const handleClick = () => {
    const randomNumber = this.generateNumber();
    console.log("random ", randomNumber)

    this.setState({ selected: randomNumber });
    
    }

    const handleVoteClick = () => {
      console.log("vote for ", this.state.selected)
      const kopio = [...this.state.pisteet]
      kopio[this.state.selected] += 1
      this.setState({ pisteet: kopio });
    }

    return (
      <div className="App">
        <p>{anecdotes[this.state.selected]}</p>
        <p>has {this.state.pisteet[this.state.selected]} votes</p>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={handleClick}>next anecdote</button>

        <MostVotes pisteet={this.state.pisteet} anecdotes={anecdotes}/>

      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export default App;
