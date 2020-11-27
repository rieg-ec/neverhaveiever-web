<template>
  <div class="w-full flex flex-col items-center py-8">

    <div class="py-1/20h text-center text-3xl">
      NUNCA NUNCA...
    </div>

    <div class="w-full flex flex-col items-center pb-12 px-16">
      <div class="text-center pt-2 pb-10 text-xl">
        <p class="uppercase text-xl">id de sala: {{ $store.state.socket.room.roomID }}</p>
      </div>

      <div class="flex flex-col items-center w-full">
        <div class="text-base pb-6">
          <p class="uppercase">personas conectadas:</p>
        </div>

        <div class="relative w-48 h-1/4 sm:w-64 sm:h-64 flex justify-center">
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
        :text="'iniciar'"
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
