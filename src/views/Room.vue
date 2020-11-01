<template>
  <div class="w-full h-full flex flex-col items-center py-8">

    <div class="py-16 text-center text-3xl">
      NUNCA NUNCA...
    </div>

    <div class="w-full flex flex-col items-center pb-12 px-16">
      <div class="text-center pt-2 pb-10 text-xl">
        <h4>ROOM ID: {{ $store.state.socket.room.roomID }}</h4>
      </div>

      <div class="flex flex-col items-center w-full">
        <div class="text-base pb-6">
          CONNECTED USERS:
        </div>

        <div class="relative w-48 h-48 sm:w-64 sm:h-64 flex justify-center">
          <UsersList :users="$store.state.socket.room.users"/>
        </div>

        <div v-if="!$store.state.socket.status.admin" class="pt-12 text-center">
          Espera a que el creador de la sala empiece el juego
        </div>
      </div>
    </div>

    <div v-if="$store.state.socket.status.admin" class="">
      <div class="">
        <BaseButton
        @clicked="startGame"
        :text="'START GAME'"
        :loading="status.loadingStart"
        :disabled="!emptyRoom"
        />
      </div>
    </div>

  </div>
</template>

<script>
import socketService from '@/socket';
import BaseButton from '@/components/BaseButton.vue';
import UsersList from '@/components/UsersList.vue';

const { socket } = socketService;

export default {
  name: 'Room',
  components: { BaseButton, UsersList },
  data() {
    return {
      status: {},
    };
  },
  created() {
    socket.on('start_game', () => {
      this.$router.replace({ name: 'Game' });
    });
  },
  computed: {
    // TODO: revert constraint of > 1 users in room to start
    emptyRoom() { return this.$store.state.socket.room.users.length > 0; },
  },
  methods: {
    startGame() {
      this.status = { loadingStart: true };
      socket.emit('start_game', this.$store.state.socket.room.roomID);
    },
  },
};
</script>
