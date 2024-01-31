import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';
import AuthContext from '../Context/auth-context';

const mainNavigation = () => {
  return (
    <AuthContext.Consumer>
      {(context) => {
        console.log(context);
        return (
          <div className="main">
            <header className="main-navigation">
              <div className="main-navigation__logo">
                <h1>sendit</h1>
              </div>
              <nav className="main-navigation__items">
                <ul>
                  {!context.token && (
                    <>
                      <li>
                        <NavLink to="/user/login">Login</NavLink>
                      </li>
                      <li>
                        <NavLink to="/user/signup">Signup</NavLink>
                      </li>
                    </>
                  )}
                  {context.token && (
                    <>
                      <li>
                        <NavLink to="/home">Dashboard</NavLink>
                      </li>
                      <li>
                        <NavLink to="/user/login" onClick={context.logout}>
                          Logout
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </header>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default mainNavigation;
