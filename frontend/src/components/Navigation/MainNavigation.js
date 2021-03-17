import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';
import AuthContext from '../Context/auth-context';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <h1>sendit</h1>
                    </div>
                    <nav className="main-navigation__items">
                        <ul>
                            <li>
                                <NavLink to="/user/login">Login</NavLink>
                            </li>
                            {!context.token && <li>
                                <NavLink to="/user/signup">Signup</NavLink>
                            </li>}
                            <li>
                                <NavLink to="/home">User</NavLink>
                            </li>
                            <li>
                                <NavLink to="/room">Room</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
            )
        }}
    </AuthContext.Consumer>
);

export default mainNavigation;