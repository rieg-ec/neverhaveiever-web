<template>
  <div class="w-full h-full">

    <div v-if="!status.submittedReady" class="w-full h-full flex flex-col items-center">
      <div class="mt-20 p-20 text-center text-2xl">
        {{ $store.state.socket.room.statement }}
      </div>

      <div class="h-1/2 flex items-center">
        <BaseButton
        @clicked="submitReady"
        :text="'LISTO'"
        />
      </div>
    </div>

    <div v-else class="w-full h-full flex flex-col items-center">
      <div class="w-full text-center pt-32 pb-6">
        <b>Esperando a:</b>
      </div>
      <div class="relative w-48 h-1/2 sm:w-64 flex justify-center">
        <UsersList :users="$store.state.socket.room.users"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import UsersList from '@/components/UsersList.vue';
import socketService from '@/socket';

// eslint-disable-next-line no-unused-vars
const { socket } = socketService;

export default {
  name: 'Statements',
  components: { BaseButton, UsersList },
  data() {
    return {
      status: {},
      statement: null,
      usersNotReady: this.$store.state.socket.room.users,
    };
  },
  created() {
    socket.on('new_statement', (statement) => {
      this.statement = statement;
      this.status = {};
    });

    socket.on('users_not_ready', (users) => {
      this.usersNotReady = users;
    });

    socket.on('start_game', () => {
      this.$router.replace({ name: 'Game' });
    });
  },
  computed: {},
  methods: {
    submitReady() {
      this.status = { submittedReady: true };
      socket.emit('ready_for_next_statement', this.$store.state.socket.room.roomID);
    },
  },
};
</script>
