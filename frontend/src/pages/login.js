import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './Auth.css';
import AuthContext from '../components/Context/auth-context';

class LoginPage extends Component {
  static contextType = AuthContext;

  state = {
    submitted: false
  };

  constructor(props) {
    super(props);
    this.usernameEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  submitHandler = async (event) => {
    event.preventDefault();
    const username = this.usernameEl.current.value;
    const password = this.passwordEl.current.value;

    // if username or password not proper string, then return

    const body = {
      username: username,
      password: password
    };

    const response = await fetch(
      'https://sendit-production.up.railway.app/user/login',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const Json = await response.json();
    console.log(Json);

    if (response.status === 200) {
      localStorage.setItem('token', Json.token);
      this.context.login(Json.token, Json.username, Json.userId);
      this.setState({ submitted: true });
    }
  };

  render() {
    if (this.state.submitted) {
      return <Redirect to="/home" />;
    }

    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="username" id="username" ref={this.usernameEl} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>
        <div>
          <Link to="/user/signup">signup</Link>
        </div>
      </form>
    );
  }
}

export default LoginPage;
