import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import SignupPage from './pages/signup';
import LoginPage from './pages/login';
import UserPage from './pages/user';
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
            <Redirect from="/" to="/login" exact />
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/user" component={UserPage} />
            <Route path="/room" component={RoomPage} />
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
