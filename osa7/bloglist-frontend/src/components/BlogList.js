import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5
};

class BlogList extends React.Component {
  render() {
    return (
      <div>
        <h2 className="blogsTitle">blogs</h2>
        <Table striped>
          <tbody>
            {this.props.blogs.map(blog => (
              <tr key={blog.id}>
                <td style={blogStyle}>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} by {blog.author}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const byLikes = (b1, b2) => b2.likes - b1.likes;
  return {
    blogs: state.blogs ? state.blogs.sort(byLikes) : []
  };
};
export default connect(mapStateToProps)(BlogList);
