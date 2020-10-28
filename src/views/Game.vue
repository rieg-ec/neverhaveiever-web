<template>
  <div class="w-full h-full flex flex-col items-center">

    <div class="mt-20 p-20 text-center text-lg">
      {{ $store.state.socket.room.statement }}
    </div>

    <div class="w-full">
      <div v-if="!status.voted" class="w-full">
        <div class="w-full flex justify-center h-40 py-6 mb-10">
          <usersList
          :users="$store.state.socket.room.users"
          />
        </div>

        <div class="flex flex-col items-center">
          <input
          class="bg-gray-200 appearance-none border-2
                rounded-full w-64 px-10 py-4 mb-6 outline-none text-gray-700
                focus:bg-white shadow"
          :class="selectedUser && !isUserValid ? 'border-red-500' : 'focus:border-purple-600'"
          type="text"
          placeholder="Pick a player"
          v-model="selectedUser"
          >

          <div class="text-center">
            <BaseButton
            :disabled= "status.voted || !isUserValid"
            @clicked="handleVote"
            :loading="status.loadingVote"
            :text="'VOTE'"
            />
          </div>
        </div>
      </div>

      <div v-else class="w-full text-center">
        <div v-if="connectedAndPendingToVoteUsers.length" class="py-6">
          <p class="pb-10">Listo! esperando a:</p>
          <div class="flex justify-center mb-20 h-72">
            <usersList
            :users="connectedAndPendingToVoteUsers"
            />
          </div>
        </div>

        <div v-else>
            <p>Todos votaron. Esperando al servidor...</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import socketService from '@/socket';
import usersList from '@/components/usersList.vue';

// eslint-disable-next-line no-unused-vars
const { emitEvents, listenEvent } = socketService;

export default {
  name: 'Game',
  components: { BaseButton, usersList },
  data() {
    return {
      status: {},
      selectedUser: null, // initial value
      pendingToVoteUsers: [],
    };
  },
  created() {
    listenEvent('new_statement', (statement) => {
      this.$store.dispatch('socket/updateStatement', statement);
    });

    listenEvent('new_voter', (pendingToVoteUsers) => {
      this.pendingToVoteUsers = pendingToVoteUsers;
    });

    listenEvent('vote_success', () => {
      this.status = { voted: true };
    });

    listenEvent('vote_failure', () => {
      this.status = { loadingVote: false };
    });

    listenEvent('round_end', (votes) => {
      this.$store.dispatch('socket/updateRoundStats', votes);
      this.$router.replace({ name: 'Summary' });
    });
  },
  computed: {
    isUserValid() {
      if (this.$store.state.socket.room.users.includes(this.selectedUser)) {
        return true;
      }

      return false;
    },
    connectedAndPendingToVoteUsers() {
      return this.pendingToVoteUsers
        .filter((user) => this.$store.state.socket.room.users.includes(user));
    },
  },
  methods: {
    handleVote() {
      if (this.isUserValid) {
        this.status = { loadingVote: true };
        emitEvents.voteUser(this.selectedUser);
      }
    },
  },
};
</script>
