import React from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      error: null,
      message: null,
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  } 

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleCreateFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      console.log("exception", exception)
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = () => {
    console.log("logout clicked")
    window.localStorage.removeItem('loggedBlogappUser')
      blogService.setToken(null)
      this.setState({ username: '', password: '', user: null})
  }

  createBlog = async (event) => {
    event.preventDefault()
    console.log("creating new blog")
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    try {
      const createdBlog = await blogService.create(blogObject)
      this.setState({
        message: `a new blog '${this.state.title}' by ${this.state.author} added`,
      })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
    
      this.setState({
        blogs: this.state.blogs.concat(createdBlog),
        title: '',
        author: '',
        url: ''
      })
      this.NewBlog.toggleVisibility()

    } catch (exception) {
      console.log("blog creation failed", exception)
      this.setState({
        error: 'blogin lisääminen epäonnistui',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }

  }

  render() {
    const loginForm = () => (
      <div>
        <LoginForm
          onSubmit={this.login}
          handleChange={this.handleLoginFieldChange}
          username={this.state.username} password={this.state.password}
        />
      </div>
    )
    const blogs = () => (
      <div>
        <Togglable buttonLabel="new blog" closingText="new blog form"
        ref={component => this.NewBlog = component}>
          <NewBlog
            onSubmit={this.createBlog}
            handleChange={this.handleCreateFieldChange}
            title={this.state.title} author={this.state.author} url={this.state.url}
          />
        </Togglable>
        <h2 className="blogsTitle">blogs</h2>
        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )

    return (
      <div>
        <Notification message={this.state.error !== null ? this.state.error : this.state.message} 
        messageType={this.state.error !== null ? 'error' : 'message' }/>
        {this.state.user === null ?
      loginForm() :
      <div>
        <p>{this.state.user.name} logged in <button onClick={this.logout}>logout</button></p>
        {blogs()}
      </div>
    }
      </div>
    );
  }
}

export default App;
