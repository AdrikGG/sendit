import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';

const mainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>sendit</h1>
        </div>
        <nav className="main-navigation__items">
            <ul>
                <li>
                    <NavLink to="/user/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/user/signup">Signup</NavLink>
                </li>
                <li>
                    <NavLink to="/home">User</NavLink>
                </li>
                <li>
                    <NavLink to="/room">Room</NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default mainNavigation;