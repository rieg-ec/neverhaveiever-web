<template>
  <div class="flex flex-col w-full h-full items-center">

    <div class="py-16 text-center text-4xl">
      GUESS WHO
    </div>

    <div class="w-full flex flex-col items-center">
      <div class="text-center pt-2 pb-10 text-xl">
        <h4>ROOM ID: {{ $store.state.socket.room.roomID }}</h4>
      </div>

      <div class="flex flex-col items-center mb-8 h-64 w-full">
        <div class="text-base pb-6">
          CONNECTED USERS:
        </div>

        <usersList
        :users="$store.state.socket.room.users"
        />

        <div v-if="!$store.state.socket.status.admin" class="py-10">
          wait for the admin to start the game :D
        </div>
      </div>
    </div>

    <div v-if="$store.state.socket.status.admin" class="flex justify-center w-1/2">
      <div class="">
        <BaseButton
        @clicked="handleStartGame"
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
import usersList from '@/components/usersList.vue';

const { emitEvents, listenEvent } = socketService;

export default {
  name: 'Room',
  components: { BaseButton, usersList },
  data() {
    return {
      status: {},
    };
  },
  created() {
    listenEvent('start_game', () => {
      this.$router.replace({ name: 'Game' });
    });
  },
  computed: {
    // TODO: revert constraint of > 1 users in room to start
    emptyRoom() { return this.$store.state.socket.room.users.length > 0; },
  },
  methods: {
    handleStartGame() {
      this.status = { loadingStart: true };
      console.log('room id: ', this.$store.state.socket.room.roomID);
      emitEvents.startGame(this.$store.state.socket.room.roomID);
    },
  },
};
</script>
