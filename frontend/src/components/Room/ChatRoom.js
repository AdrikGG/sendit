import React, { Component } from 'react';
import io from 'socket.io-client';

import './ChatRoom.css';

import UserBar from '../UserBar/UserBar';
import Messages from '../Messages/Messages';
import InputBar from '../InputBar/InputBar';

let socket;

let ENDPOINT = 'localhost:3000/room/';

class ChatRoom extends Component {
    state = {
        room: null,
        users: null,
        message: null,
        token: localStorage.getItem("token")
    };

    constructor(props) {
        super(props);
        const path = window.location.pathname.split('/');
        const roomId = path[path.length-1];
        console.log(roomId);
        this.getRoomData(roomId);
        // this.state.users = this.getUserData();

        ENDPOINT += roomId;
        console.log(ENDPOINT);

        socket = io(ENDPOINT);

        socket.emit('join', { token: this.state.token, roomId }, (error) => {
            if(error) {
                alert(error);
            }
        });

        socket.on('message', message => {
            this.state.room.messages = [...this.state.room.messages, message];
        });

        socket.on("roomData", ({ users }) => {
            this.state.users = users;
        });

        // return () => {
        //     socket.emit('disconnect');
        //     socket.off();
        // }
    }

    async getRoomData(roomId) {
        const response = await fetch(`/room/${roomId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        })
        const Json = await response.json();
        this.state.room = Json;
        console.log(this.state.room);
        console.log(this.state.room.messages);
    }

    sendMessage = (event) => {
        event.preventDefault();

        if(this.state.message) {
            socket.emit('sendMessage', this.state.message, () => this.setMessage(''));
        }
    }

    setMessage(newMessage) {
        this.state.message = newMessage;
    }

    displayRoom() {
        
        return (
            <div className="outerContainer">
                <div className="container">
                    <Messages messages={this.state.room.messages} />
                    <InputBar message={this.state.message} setMessage={this.setMessage} sendMessage={this.sendMessage} />
                </div>
                <UserBar users={this.state.users}/>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div>{this.displayRoom()}</div>
            </div>
        );
    }
}

export default ChatRoom;