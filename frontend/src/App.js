import React, { Component } from 'react';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import HomePage from './pages/dashboard';
import ChatRoom from './components/Room/ChatRoom';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './components/Context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    username: null,
    userId: null
  };

  componentDidMount() {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken && storedUsername && storedUserId) {
      this.setState({
        token: storedToken,
        username: storedUsername,
        userId: storedUserId
      });
    }
  }

  login = (token, username, userId) => {
    this.setState({ token, username, userId }, () => {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', userId);
    });
  };

  logout = () => {
    this.setState({ token: null, username: null, userId: null }, () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
    });
  };

  render() {
    return (
      <HashRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              username: this.state.username,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>
                <Redirect from="/" to="/user/login" exact />
                <Route path="/user/signup" component={SignupPage} />
                <Route path="/user/login" component={LoginPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/room" component={ChatRoom} />
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </HashRouter>
    );
  }
}

export default App;
