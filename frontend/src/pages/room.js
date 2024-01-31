import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class RoomPage extends Component {
  render() {
    const socket = socketIOClient();
    socket.emit('chat message', 'message');
    return <h1>The Room Page</h1>;
  }
}

export default RoomPage;
