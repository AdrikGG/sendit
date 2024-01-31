import React, { Component, createRef } from 'react';
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
    message: '',
    token: localStorage.getItem('token')
  };

  constructor(props) {
    super(props);
    this.messagesContainerRef = createRef();
    const path = window.location.pathname.split('/');
    const roomId = path[path.length - 1];
    rId = roomId;

    let URL = 'sendit-production.up.railway.app';
    socket = io(URL, { autoConnect: false });
    socket.connect();

    socket.emit('join', { token: this.state.token, roomId }, (error) => {
      if (error) {
        alert(error);
      }
    });

    socket.on('message', (message) => {
      this.setState((prevState) => {
        const updatedRoom = {
          ...prevState.room,
          messages: [...(prevState.room?.messages || []), message]
        };

        return { room: updatedRoom };
      });
    });
  }

  componentDidMount() {
    this.getUsersData(rId);
    this.getRoomData(rId);
  }

  async getRoomData(roomId) {
    const response = await fetch(
      `https://sendit-production.up.railway.app/room/${roomId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.state.token
        }
      }
    );

    if (response.ok) {
      const Json = await response.json();
      this.setState({ room: Json });
    } else if (response.status === 401) {
      window.location.href = '/user/login';
    }
  }

  async getUsersData(roomId) {
    const response = await fetch(
      `https://sendit-production.up.railway.app/user/users?roomId=${roomId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.state.token
        }
      }
    );

    if (response.ok) {
      const Json = await response.json();
      if (Json.users.length > 0) this.setState({ users: Json.users });
    } else if (response.status === 401) {
      window.location.href = '/user/login';
    }
  }

  sendMessage = (event) => {
    event.preventDefault();

    if (this.state.message) {
      socket.emit('send message', this.state.message, this.state.room._id);
    }
    this.setMessage('');
    this.scrollToBottom();
  };

  setMessage = (newMessage) => {
    this.setState({ message: newMessage });
  };

  scrollToBottom() {
    if (this.messagesContainerRef.current) {
      const container = this.messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div className="outerContainer">
        <div className="container">
          <Messages
            messages={this.state.room?.messages || []}
            containerRef={this.messagesContainerRef}
          />
          <InputBar
            message={this.state.message}
            setMessage={this.setMessage}
            sendMessage={this.sendMessage}
          />
        </div>
        <div className="align-items-end"></div>
        <div className="sideBar">
          <div className="joinCode">
            <h1>Join Code:</h1>
            <h2>{rId}</h2>
          </div>
          <UserBar users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default ChatRoom;
