<template>
  <router-view/>
</template>

<script>
import socketService from '@/socket';

export default {
  name: 'App',
  mounted() {
    // events are listened in the receiveEvents function and sent to vuex
    socketService.receiveEvents();
  },
};
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@700&display=swap'); */

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background: theme(colors.deep-purple-400-accent);
  border-radius: 10px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  color: theme(colors.gray.800);
  background-color: white;
  width: 100%;
  height: 100%;
}
</style>
