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
  joinRoomSucess({ commit }, roomID) {
    commit('joinRoomSucess', roomID);
  },
  createRoomSuccess({ commit }, roomID) {
    commit('createRoomSuccess', roomID);
  },
  connectedUsers({ commit }, usernames) {
    commit('connectedUsers', usernames);
  },
  newStatement({ commit }, statement) {
    commit('newStatement', statement);
  },
  kicked({ commit }) {
    commit('kicked');
  },
};

const mutations = {
  connect(state) {
    state.isOnline = true;
  },
  disconnect(state) {
    Object.assign(state, initialState);
    state.isOnline = false;
  },
  updateUsername(state, username) {
    state.username = username;
  },
  joinRoomSucess(state, roomID) {
    state.room.roomID = roomID;
    state.status = { connected: true, admin: false };
  },
  createRoomSuccess(state, roomID) {
    state.room = { roomID, users: [state.username] };
    state.status = { connected: true, admin: true };
  },
  connectedUsers(state, usernames) {
    state.room.users = usernames;
  },
  newStatement(state, statement) {
    state.room.statement = statement;
  },
  kicked(state) {
    Object.assign(state, initialState);
  },
};

export default {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
};
