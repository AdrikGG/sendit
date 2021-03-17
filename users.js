const users = [];

const addUser = ({ sid, username, roomId }) => {
  username = username;
  room = roomId;

  const user = { sid, username, roomId };

  users.push(user);

  return { user };
}

const removeUser = (sid) => {
  const index = users.findIndex((user) => user.sid === sid);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (sid) => users.find((user) => user.sid === sid);

const getUsersInRoom = (roomId) => users.filter((user) => user.roomId === roomId);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };