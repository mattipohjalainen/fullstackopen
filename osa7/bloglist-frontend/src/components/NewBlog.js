import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'

class NewBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }

    this.props.createBlog(blog)

    this.props.notify({
      message: `blog '${blog.title}' by ${blog.author} added`, 
      type: 'info'
    })

    this.setState({
      title: '',
      url: '',
      author: '',
    })
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Luo uusi blogi</h2>

        <form onSubmit={this.addBlog}>
          <div>
            title
            <input
              value={this.state.title}
              name='title'
              onChange={this.handleChange}
            />
          </div>
          <div>
            author
            <input
              value={this.state.author}
              name='author'
              onChange={this.handleChange}
            />
          </div>
          <div>
            url
            <input
              value={this.state.url}
              name='url'
              onChange={this.handleChange}
            />
          </div>

          <button type="submit">Luo</button>
        </form>
      </div>
    )
  }
}

export default connect(null, {
createBlog, notify
})(NewBlog)
