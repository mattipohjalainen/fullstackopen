import React from 'react'
import { connect } from 'react-redux'
import { like, comment, remove } from '../reducers/blogsReducer'

class BlogDetails extends React.Component {
  comment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    this.props.comment(this.props.blog, comment)
    event.target.comment.value = ''
  }

  remove = () => {
    this.props.remove(this.props.blog)
    this.props.history.push('/')
  }

  render() {
      console.log("this.pops:", this.props)
    const { blog } = this.props

    if (blog === null) {
      return null
    }
    console.log("blog:", blog)

    const adder = blog.user ? blog.user.name : 'anonymous'

    const contentStyle = {
      margin: 5,
    }

    //console.log(blog.user.username,  this.props.user.username)
    const deletable = blog.user === undefined || blog.user.username === this.props.user.username

    let comments = []
    if (blog.comments) {
        comments = blog.comments
    } 

    return (
      <div>
        <h2>{blog.title} {blog.author}</h2>
        <div style={contentStyle} className='content'>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={() => this.props.like(blog)}>like</button>
          </div>
          <div>
            added by {adder}
          </div>
          {deletable && <div><button onClick={this.remove}>delete</button></div>}

          <h3>comments</h3>
          <ul>
            {comments.map((comment, i) => <li key={i}>{comment}</li>)}
          </ul>

          <form onSubmit={this.comment}>
            <input name="comment"/>
            <button type="submit">add comment</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { blogId } = props

  console.log("mapping, blogId:", blogId)

  if (state.blogs === null) {
    return { blog: null }
  }

  return {
    blog: state.blogs.find(blog => blog.id === blogId),
    user: state.user.user
  }
}

export default connect(mapStateToProps, {
  like, comment, remove
})(BlogDetails)