import React, { useState, useEffect, Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import io from 'socket.io-client';

import './ChatRoom.css';

import UserBar from '../UserBar/UserBar';
import Messages from '../Messages/Messages';
import InputBar from '../InputBar/InputBar';

let socket;
let rId;

class ChatRoom extends Component {
    state = {
        room: null,
        user: null,
        users: null,
        message: null,
        token: localStorage.getItem("token")
    };

    constructor(props) {
        super(props);
        const path = window.location.pathname.split('/');
        const roomId = path[path.length-1];
        console.log(roomId);
        rId = roomId;
        this.getRoomData(roomId);
        this.getUserData();
        // this.state.users = this.getUserData();

        this.setMessage = this.setMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);

        let URL = 'localhost:3000';
        console.log(URL);

        socket = io(URL, { autoConnect: false });
        socket.onAny((event, ...args) => {
            console.log(event, args);
        });

        socket.connect();

        socket.emit('join', { token: this.state.token, roomId }, (error) => {
            if(error) {
                alert(error);
            }
        });

        socket.on('message', message => {
            // console.log("message socket");
            // console.log(this.state.room);
            // console.log(this.state.room.messages);
            const r = this.state.room;
            r.messages = [...r.messages, message];
            this.setState({room: r});
            console.log(this.state.room);
        });

        socket.on("roomData", ({ users }) => {
            this.setState({users: users});
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
        this.setState({room: Json});
        // console.log(this.state.room);
        // console.log(this.state.room.messages);
    }

    async getUserData() {
        const response = await fetch(`/user/username`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        })
        const Json = await response.json();
        this.setState({user: Json.username});
        console.log(this.state.user);
        this.showMessages();
    }

    sendMessage = (event) => {
        event.preventDefault();

        // console.log("In sendMessage");
        // console.log(this.state.message);
        // console.log(this.state.room)
        // console.log(this.state.room._id)

        if(this.state.message) {
            console.log(this.state.message);
            socket.emit('send message', this.state.message, this.state.room._id);
        }
        this.setMessage('');
        window.scrollTo(0, document.body.scrollHeight);
    }

    setMessage(newMessage) {
        window.scrollTo(0, document.body.scrollHeight);
        console.log("In setMessage")
        const m = {message: {text: newMessage, username: null}};
        this.setState({message: newMessage});
    }

    showMessages() {
        return (
            <div>
                {this.state.room.messages.map((message, i) => {
                    return (
                        <div key={i}>
                            <div className="messageContainer justifyStart">
                                <div className="messageBox backgroundLight">
                                    <p className="messageText colorDark">{message.text}</p>
                                </div>
                                <p className="sentText pl-10 ">{message.username}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {
        window.scrollTo(0, document.body.scrollHeight);
        if(!this.state.room) {
            return (
                <div className="outerContainer"></div>
            )
        }
        if(!this.state.room.messages) {
            return (
                <div className="outerContainer"></div>
            )
        }
        return (
            <div className="outerContainer">
                <div className="container">
                    {this.showMessages()}
                    <InputBar message={this.state.message} setMessage={this.setMessage} sendMessage={this.sendMessage} />
                </div>
                <div className="align-items-end">
                    <div className="joinCode">
                        <h1>Join Code:</h1>
                        <h2>{rId}</h2>
                    </div>
                </div>
                {/* <div>
                    <UserBar users={this.state.users}/>
                </div> */}
            </div>
        );
    }
}

export default ChatRoom;