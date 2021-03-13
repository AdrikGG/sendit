import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import socketIOClient from "socket.io-client";

import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import HomePage from './pages/dashboard';
import RoomPage from './pages/room';
import MainNavigation from './components/Navigation/MainNavigation';

import './App.css';

function App() {

  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/user/login" exact />
            <Route path="/user/signup" component={SignupPage} />
            <Route path="/user/login" component={LoginPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/room" component={RoomPage} />
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
