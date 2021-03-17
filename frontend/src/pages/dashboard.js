import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";

import './Dashboard.css'
import AuthContext from '../components/Context/auth-context';

class Dashboard extends Component {
    static contextType = AuthContext;

    state = {
        rooms: []
    };

    constructor(props) {
        super(props);
        this.roomnameEl = React.createRef();

        this.displayRooms();
        this.render();
    }

    async displayRooms() {
        const token = localStorage.getItem("token");

        let request = new Request('/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(request);
        const response = await fetch(request);
        const Json = await response.json();
        this.setState({rooms: Json.rooms});
        console.log(this.state.rooms);
    }

    submitHandler = async event => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const roomname = this.roomnameEl.current.value;

        // if not propper string, then return

        const body = {
            name: roomname
        }
        
        const response = await fetch('/room/create', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        const Json = await response.json();
        this.setState(prevState => {
            return {
                rooms: [...prevState.rooms, Json]
            }
        });
    }

    async deleteRoom(room) {
        let rooms = this.state.rooms.filter(item => item !== room);
        this.setState({rooms: rooms});

        const token = localStorage.getItem("token");
        await fetch(`/room/${room.roomId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    }

    listRooms() {
        let rooms = this.state.rooms;
        console.log(this.state.rooms);
        return (
            <ul>
                {rooms.map((val, index) => {
                    return (
                        <div>
                            <div key={index} className="room-component">
                                <Link className="room-link" to={`/room/${val.roomId}`}>
                                    <h1>{val.roomName}</h1>
                                </Link>
                                <button value="Delete" onClick={this.deleteRoom.bind(this, val)}>Delete Room</button>
                            </div>
                            <div key={0-index} className="lastMessage">
                                <h2>{val.lastMessage}</h2>
                            </div>
                        </div>
                    )
                })}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <form className="create-room-form" onSubmit={this.submitHandler}>
                    <div className="create-room">
                        <label htmlFor="roomname">Room name</label>
                        <input type="roomname" id="roomname" placeholder="Room name" ref={this.roomnameEl} required />
                        <button type="submit">Create new room</button>
                    </div>
                </form>
                <div className="room-display">
                    <div>{this.listRooms()}</div>
                </div>
            </div>
        );
    }
}

export default Dashboard;