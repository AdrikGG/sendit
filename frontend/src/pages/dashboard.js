//import { token } from 'morgan';
import React, { Component } from 'react';

import './Dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.roomnameEl = React.createRef();

        const token = {
            token: localStorage.getItem("token")
        }
        
        const response = fetch('/dashboard', {
            method: 'POST',
            body: JSON.stringify(token),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response.then(data => {
            console.log(data);
        })
        // const Json = response.json();
        // console.log(Json);
    }

    submitHandler = async event => {
        event.preventDefault();
        const roomname = this.roomnameEl.current.value;

        // if not propper string, then return

        const body = {
            token: localStorage.getItem("token"),
            name: roomname
        }
        
        const response = fetch('/rooms/create', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        response.then(data => {
            console.log(data);
        })
    }

    render() {
        return (
            <form className="create-room-form" onSubmit={this.submitHandler}>
                <div className="create-room">
                    <button type="submit">Create new room</button>
                    <label htmlFor="roomname">Room name</label>
                    <input type="roomname" id="roomname" ref={this.roomnameEl} />
                </div>
            </form>
        );
    }
}

export default Dashboard;