import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Home from '@/views/Home.vue';
import Room from '@/views/Room.vue';
import Game from '@/views/Game.vue';
import Summary from '@/views/Summary.vue';
import NotFound from '@/views/NotFound.vue';

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
    path: '/summary',
    name: 'Summary',
    component: Summary,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // prevent users from visiting views when they're not connected to a room
  if (!store.state.socket.status.connected && to.name !== 'Home') {
    console.log('it worked hii', from.name);
    next({ name: 'Home', replace: true });
  } else { next(); }
});

export default router;
