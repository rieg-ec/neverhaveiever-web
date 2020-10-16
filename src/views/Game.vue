<template>
  <div :class="$style['component-container']">

    <div :class="$style['top-content']">
      {{ $store.state.socket.room.statement }}
    </div>
    <div :class="$style['bottom-content']">

      <div v-if="!status.voted" :class="$style['has-not-voted']">
        <div :class="$style['drop-down']">
          <div :class="$style['menu-container']">
            <DropDownMenu
            :title="'Select a player'"
            :options="$store.state.socket.room.users"
            :active="!status.voted"
            @selection="handleSelection"
            />
          </div>
        </div>

        <div :class="$style['vote-button']">
          <BaseButton
          :disabled= "status.voted"
          @clicked="handleVote"
          :loading="status.loadingVote"
          :text="'VOTE'"
          />
        </div>
      </div>

      <div v-else :class="$style['has-voted']">
        <div v-if="pendingToVoteUsers.length > 0" class="">
          Listo!
          Esperando a:
          <div v-for="(user, index) in pendingToVoteUsers"  :key="index"  class="">
            {{ user }}
          </div>
        </div>

        <div v-else class="">
            <p>Todos votaron. Esperando al servidor...</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import socketService from '@/socket';
import DropDownMenu from '@/components/DropDownMenu.vue';

// eslint-disable-next-line no-unused-vars
const { emitEvents, listenEvent } = socketService;

export default {
  name: 'Game',
  components: { BaseButton, DropDownMenu },
  data() {
    return {
      status: {},
      votedUser: this.$store.state.socket.room.users[0], // initial value
      pendingToVoteUsers: [],
    };
  },
  mounted() {
    listenEvent('new_statement', (statement) => {
      console.log('received statement', statement);
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

    listenEvent('round_end', (roundStats) => {
      this.$store.dispatch('socket/updateRoundStats', roundStats);
      this.$router.replace({ name: 'Summary' });
    });
  },
  computed: {},
  methods: {
    handleVote() {
      this.status = { loadingVote: true };
      emitEvents.voteUser(this.votedUser);
    },
    handleSelection(user) { this.votedUser = user; console.log(user); },
  },
};
</script>

<style lang="scss" module>
.component-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-content {
  flex-grow: 1;
  text-align: center;
  padding-top: 100px;
}

.bottom-content {
  flex-grow: 3;
}

.bottom-content .has-not-voted {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.bottom-content .has-not-voted .drop-down {
  flex-grow: 1;
}

.bottom-content .has-not-voted .drop-down .menu-container {
}

.bottom-content .has-not-voted .vote-button {
  flex-grow: 3;
}

</style>
