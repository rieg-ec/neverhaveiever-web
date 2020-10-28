const initialState = {
  isOnline: true,
  status: {
    connected: false,
  },
  room: {},
  username: null,
};

// const getters = {};

const actions = {
  connect({ commit }) {
    commit('connect');
  },
  disconnect({ commit }) {
    commit('disconnect');
  },
  leaveRoom({ commit }) {
    commit('leaveRoom');
  },
  updateUsername({ commit }, username) {
    commit('updateUsername', username);
  },
  roomRequestSuccess({ commit }, { roomID, users }) {
    commit('roomRequestSuccess', { roomID, users });
  },
  createRoomSuccess({ commit }, roomID) {
    commit('createRoomSuccess', roomID);
  },
  newUser({ commit }, username) {
    commit('newUser', username);
  },
  removeUser({ commit }, username) {
    commit('removeUser', username);
  },
  getAdmin({ commit }) {
    commit('getAdmin');
  },
  startGame({ commit }) {
    commit('startGame');
  },
  updateStatement({ commit }, statement) {
    commit('updateStatement', statement);
  },
  updateRoundStats({ commit }, votes) {
    commit('updateRoundStats', votes);
  },
};

const mutations = {
  connect(state) {
    state.isOnline = true;
  },
  disconnect(state) {
    state.isOnline = false;
  },
  leaveRoom(state) {
    state.status = { connected: false };
    state.room = {};
  },
  updateUsername(state, username) {
    // TODO: if i create a new module, move this to that module, this
    // is not related to sockets
    state.username = username;
  },
  roomRequestSuccess(state, { roomID, users }) {
    state.room = { roomID, users };
    state.status = { connected: true, admin: false };
  },
  createRoomSuccess(state, roomID) {
    state.room = { roomID, users: [state.username] };
    state.status = { connected: true, admin: true };
  },
  newUser(state, username) {
    state.room.users.push(username);
  },
  removeUser(state, username) {
    const userIdx = state.room.users.indexOf(username);
    state.room.users.splice(userIdx, 1);
  },
  getAdmin(state) {
    state.status.admin = true;
  },
  updateStatement(state, statement) {
    state.room.statement = statement;
  },
  updateRoundStats(state, votes) {
    state.room.roundStats = { votes };
  },
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
};
