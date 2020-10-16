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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: pink;
  width: 100%;
  height: 100%;
}
</style>
