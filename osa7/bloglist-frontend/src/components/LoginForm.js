import React from "react";
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { updateLoginForm, login } from '../reducers/userReducer'

class LoginForm extends React.Component {

  login = async (event) => {
    event.preventDefault()
    this.props.login(this.props.user)
  }

  handleLoginChange = (event) => {
    this.props.updateLoginForm({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h2>Kirjaudu sovellukseen</h2>
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.props.user.username}
              onChange={this.handleLoginChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.props.user.password}
              onChange={this.handleLoginChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {
  login, updateLoginForm
})(LoginForm)