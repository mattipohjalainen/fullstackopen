import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink, Redirect } from 'react-router-dom'
import { Table, Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

const menuStyle = { 
  padding: 20,
  background: 'turquoise'
}
const activeStyle = {
  fontWeight: 'bold',
    color: 'blue'
}
const Menu = () => (
  
  <div style={ menuStyle }>    
    <NavLink to="/anecdotes" activeStyle={ activeStyle}>anecdotes</NavLink> &nbsp;
    <NavLink to="/create" activeStyle={ activeStyle}>create new</NavLink> &nbsp;
    <NavLink to="/about" activeStyle={ activeStyle}>about</NavLink>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
    <tbody>
      {anecdotes.map(anecdote => 
      <tr key={anecdote.id} >
      <td>
      <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      </td>
      </tr>
    )}
    </tbody>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => {
  console.log("anecdote:", anecdote)
  return(
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <div>has {anecdote.votes} votes</div>
    <div>for more information see <a href="{anecdote.info}">{anecdote.info}</a></div>
    <br />
  </div>
)}

class Notification extends React.Component {

  render() {
    const style = {
      border: 'solid',
      color: 'green',
      borderRadius: 10,
      padding: 10,
      borderWidth: 1
    }
    const message = this.props.message

    if (message === '') {
      return (
        null
      )
    } else {
      return (
        <div style={style}>
          { message }
        </div>
      )
    }
  }
}


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
      <Row className="show-grid">
      <Col xs={8} md={6}>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col xs={6} md={4}>
        <img alt="kuva" height="200" width="180"
        src="https://pbs.twimg.com/profile_images/79787739/mf-tg-sq_400x400.jpg" />
      </Col>
      </Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

const FooterLink = () => (
  <div>
    <Link to="/footer">footer</Link>
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
      redirectAfterCreate: false
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.setState({ redirectAfterCreate: true })
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
        <FormGroup>
        <ControlLabel>content</ControlLabel>
        <FormControl
            type="text"
            name="content"
            value={this.state.content} onChange={this.handleChange} 
          />
          <ControlLabel>author</ControlLabel>
        <FormControl
            type="text"
            name="author"
            value={this.state.author} onChange={this.handleChange} 
          />
          <ControlLabel>url for more info</ControlLabel>
        <FormControl
            type="text"
            name="info"
            value={this.state.info} onChange={this.handleChange} 
          />
          <div style={{padding: 5}} />
          <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
        </form>
        {this.state.redirectAfterCreate && (
          <Redirect to="/anecdotes"/>
        )}
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: '',
      redirectAfterCreate: false
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote),
    redirectAfterCreate: true ,
  notification: "a new anecdote " + anecdote.content +" created"})

  setTimeout(() => {
    this.setState({ notification: '' })
  }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    const anecdoteById = (id) => {
      console.log("ID:", id)
      console.log("all anecdotes:", this.state.anecdotes)
    return this.state.anecdotes.find(anecdote => anecdote.id === id)
    }
    return (
      <div className="container">
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification message={this.state.notification} />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route exact path="/anecdotes" render={() =>
              <AnecdoteList anecdotes={this.state.anecdotes} />
            }
            />
            <Route path="/about" render={() => <About />} />
            <Route path="/create" render={() => <CreateNew addNew={this.addNew} />} />
            <Route path="/footer" render={() => <Footer />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <Anecdote anecdote={anecdoteById(match.params.id)} />}
            />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
