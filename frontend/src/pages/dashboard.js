import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './dashboard.css';
import AuthContext from '../components/Context/auth-context';

class Dashboard extends Component {
  static contextType = AuthContext;

  state = {
    rooms: []
  };

  constructor(props) {
    super(props);
    this.roomnameEl = React.createRef();
    this.roomidEl = React.createRef();

    this.displayRooms();
    this.render();
  }

  async displayRooms() {
    const token = localStorage.getItem('token');

    let request = new Request(
      'https://sendit-production.up.railway.app/dashboard',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    );
    // console.log(request);
    const response = await fetch(request);
    const Json = await response.json();

    if (response.status === 401) {
      window.location.href = '/user/login';
      return;
    } else {
      this.setState({ rooms: Json.rooms });
      // console.log(this.state.rooms);
    }
  }

  createHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const roomname = this.roomnameEl.current.value;

    // if not proper string, then return

    const body = {
      name: roomname
    };

    const response = await fetch(
      'https://sendit-production.up.railway.app/room/create',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    );
    const Json = await response.json();
    console.log(Json.createdRoom);

    if (response.status === 401) {
      window.location.href = '/user/login';
      return;
    }

    const addedRoom = {
      roomId: Json.createdRoom._id,
      roomName: Json.createdRoom.name,
      lastMessage: null
    };

    if (Json.createdRoom.messages.length > 0) {
      addedRoom.lastMessage =
        Json.createdRoom.messages[Json.createdRoom.messages.length - 1];
    } else {
      addedRoom.lastMessage = 'No messages';
    }
    this.setState((prevState) => {
      return {
        rooms: [...prevState.rooms, addedRoom]
      };
    });
  };

  joinHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const roomId = this.roomidEl.current.value;

    // if not proper string, then return

    const body = {
      id: roomId
    };

    const response = await fetch(
      'https://sendit-production.up.railway.app/room/join',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    );
    const Json = await response.json();
    console.log(Json);

    if (response.status === 401) {
      window.location.href = '/user/login';
      return;
    }

    console.log(Json.joinedRoom);
    if (Json.error) {
      return;
    }

    const addedRoom = {
      roomId: Json.joinedRoom._id,
      roomName: Json.joinedRoom.name,
      lastMessage: null
    };

    if (Json.joinedRoom.messages.length > 0) {
      addedRoom.lastMessage =
        Json.joinedRoom.messages[Json.joinedRoom.messages.length - 1];
    } else {
      addedRoom.lastMessage = 'No messages';
    }

    this.setState((prevState) => {
      return {
        rooms: [...prevState.rooms, addedRoom]
      };
    });
  };

  async deleteRoom(room) {
    let rooms = this.state.rooms.filter((item) => item !== room);
    this.setState({ rooms: rooms });

    const token = localStorage.getItem('token');
    const response = await fetch(
      `https://sendit-production.up.railway.app/room/${room.roomId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      }
    );

    if (response.status === 401) {
      window.location.href = '/user/login';
      return;
    }
  }

  listRooms() {
    let rooms = this.state.rooms;
    // console.log(this.state.rooms);
    return (
      <ul>
        {rooms.map((val, index) => {
          let usrnm;
          let msg;

          if (!val.lastMessage.username) {
            usrnm = '';
            msg = 'No messages';
          } else {
            usrnm = val.lastMessage.username + ' ->';
            msg = val.lastMessage.text;
          }

          return (
            <div key={index}>
              <div className="room-component">
                <Link className="room-link" to={`/room/${val.roomId}`}>
                  <h1 style={{ marginBottom: '0.5rem' }}>{val.roomName}</h1>
                </Link>
                <button
                  value="Delete"
                  onClick={this.deleteRoom.bind(this, val)}
                >
                  Delete Room
                </button>
              </div>
              <div className="lastMessage" style={{ clear: 'both' }}>
                <h3 style={{ float: 'left', marginTop: '0' }}>{usrnm}</h3>
                <h3
                  className="message"
                  style={{ float: 'left', paddingLeft: '10px', marginTop: '0' }}
                >
                  {msg}
                </h3>
              </div>
            </div>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div>
        <form className="create-room-form" onSubmit={this.createHandler}>
          <div className="create-room">
            <label htmlFor="roomname">Room Name</label>
            <input
              type="roomname"
              id="roomname"
              placeholder="Room name"
              ref={this.roomnameEl}
              required
            />
            <button type="submit">Create New Room</button>
          </div>
        </form>
        <form className="create-room-form" onSubmit={this.joinHandler}>
          <div className="join-room">
            <label htmlFor="roomid">Room ID</label>
            <input
              type="roomid"
              id="roomid"
              placeholder="Room id"
              ref={this.roomidEl}
              required
            />
            <button type="submit">Join Room</button>
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
