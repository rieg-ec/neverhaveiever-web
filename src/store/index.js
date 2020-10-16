import { createStore } from 'vuex';

import socket from './modules/socket';

export default createStore({
  modules: { socket },
});
