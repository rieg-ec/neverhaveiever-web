import io from 'socket.io-client';
import store from '../store';

const socket = io('http://localhost:3000');

const receiveEvents = () => {
  socket.on('connect', () => {
    console.log('connect event in socket/index.js');
    store.dispatch('socket/connect');
  });

  socket.on('new_user', (username) => {
    console.log('new user connected in socket/index.js');
    store.dispatch('socket/newUser', username);
  });

  socket.on('remove_user', (username) => {
    console.log('removed user in socket/index.js');
    store.dispatch('socket/removeUser', username);
  });
};

const listenEvent = (eventName, callback) => {
  socket.on(eventName, callback);
};

const roomRequest = (roomID, username) => {
  /* socket event: 'room_request' */
  console.log('connecting to room in socket/index.js');
  socket.emit('room_request', roomID, username);
  console.log('room_request in socket/index.js', roomID, username);
};

const createRoom = (username) => {
  /*  socket event: 'create_room' */
  console.log('sending create room event in socket/index.js with username', username);
  socket.emit('create_room', username);
};

const leaveRoom = () => {
  // eslint-disable-next-line max-len
  if (store.state.socket.status.connected) {
    console.log('sending leave room event in socket/index.js with username');
    store.dispatch('socket/leaveRoom');
    socket.emit('disconnect');
  }
};

const startGame = (roomID) => {
  console.log('sending start_game event with roomID', roomID, 'in socket/index.js');
  socket.emit('start_game', roomID);
};

const voteUser = (username) => {
  console.log('voting for', username, 'in socket/index.js');
  // TODO: dispatch voted state to store
  socket.emit('vote_user', username, store.state.socket.room.roomID);
};

const ready = () => {
  console.log('sent ready in socket/index.js');
  socket.emit('ready', store.state.socket.room.roomID);
};

const emitEvents = {
  roomRequest, createRoom, startGame, leaveRoom, voteUser, ready,
};

export default { receiveEvents, emitEvents, listenEvent };
