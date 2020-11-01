import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Home from '@/views/Home.vue';
import Room from '@/views/Room.vue';
import Game from '@/views/Game.vue';
import Statements from '@/views/Statements.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/room',
    name: 'Room',
    component: Room,
  },
  {
    path: '/game',
    name: 'Game',
    component: Game,
  },
  {
    path: '/statements',
    name: 'Statements',
    component: Statements,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // prevent users from visiting views when they're not connected to a room
  if (!store.state.socket.status.connected && to.name !== 'Home') {
    next({ name: 'Home', replace: true });
  } else { next(); }
});

export default router;
