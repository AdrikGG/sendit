import React, { Component } from 'react';

import './Auth.css';
import AuthContext from '../components/Context/auth-context';

class SignupPage extends Component {
    static contextType = AuthContext;
    
    constructor(props) {
        super(props);
        this.usernameEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    submitHandler = async event => {
        event.preventDefault();
        const username = this.usernameEl.current.value;
        const password = this.passwordEl.current.value;

        // if not propper string, then return

        const body = {
            username: username,
            password: password
        }

        const response = await fetch('/user/signup', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const Json = await response.json();
        console.log(Json);
        localStorage.setItem("token", Json.token);
        this.context.login(Json.token, Json.username, Json.userId);
    }

    render() {
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
                    <button type="button">Switch to login</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        );
    }
}

export default SignupPage;