import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Table } from 'react-bootstrap'

import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import BlogDetails from "./components/BlogDetails";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import Users from "./components/Users";
import User from "./components/User";
import Menu from "./components/Menu";
import BlogList from "./components/BlogList"

import { connect } from "react-redux";
import { notify } from "./reducers/notificationReducer";
import { setLoggedUser, login, logout } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogsReducer";
import { initializeUsers } from "./reducers/usersReducer";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initializeUsers();
    this.props.initializeBlogs();

    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);

      this.props.setLoggedUser(user);
      blogService.setToken(user.token);
    }
  }

  render() {
     
    if (this.props.user === null) {
      return (
        <div>
          <Notification />
          <LoginForm />
        </div>
      );
    }

    return (
      <div className="container">
        
        <Notification />

        <Router>
          <div>
          <Menu name={this.props.user.name} logout={this.props.logout}/>
        
            <Route
              exact
              path="/"
              render={() => (
                <div>
                <Togglable buttonLabel="new blog" closingText="new blog form">
              <NewBlog />
            </Togglable>
                <BlogList />
                </div>
              )}
            />
            <Route
              exact
              path="/blogs"
              render={() => (
                <div>
                <Togglable buttonLabel="new blog" closingText="new blog form">
              <NewBlog />
            </Togglable>
                <BlogList />
                </div>
              )}
            />
            <Route
              path="/blogs/:id"
              render={({ match, history }) => (
                <BlogDetails blogId={match.params.id} history={history} />
              )}
            />
            <Route exact path='/users' render={() => <Users />} />

            <Route path='/users/:id' render={
              ({ match }) => <User userId={match.params.id} />
            } />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};
export default connect(
  mapStateToProps,
  {
    notify,
    login,
    logout,
    setLoggedUser,
    initializeBlogs,
    initializeUsers
  }
)(App);
