import React from "react";
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2 className="login">Kirjaudu</h2>

      <form onSubmit={onSubmit}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
};

export default LoginForm;
