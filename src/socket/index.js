import io from 'socket.io-client';
import store from '../store';

// TODO: move to env variable
const socket = io('http://localhost:3000');

const receiveEvents = () => {
  socket.on('connect', () => {
    store.dispatch('socket/connect');
  });

  socket.on('connected_users', (usernames) => {
    store.dispatch('socket/connectedUsers', usernames);
  });

  socket.on('new_statement', (statement) => {
    store.dispatch('socket/newStatement', statement);
  });

  socket.on('kicked', () => { store.dispatch('socket/kicked'); });
};

export default { socket, receiveEvents };
