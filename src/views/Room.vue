<template>
  <div :class="$style['component-container']">
    <GameTitle />

    <div :class="$style['top-content']">
      <div :class="$style['room-content']">
        <h4>ROOM ID: {{ roomData.roomID }}</h4>
      </div>

      <div :class="$style['connected-users']">
        <div :class="$style['title']">
          CONNECTED USERS:
        </div>

        <div
        v-for="(user, index) in roomData.users"
        :key="index"
        :class="$style['user']"
        >
          {{ user }}
        </div>

      </div>

      <div v-if="!statusData.admin" :class="$style['user-content']">
        wait for the admin to start the game :D
      </div>
    </div>

    <div v-if="statusData.admin" :class="$style['bottom-content']">
      <BaseButton
      @clicked="handleStartGame"
      :text="'START GAME'"
      :loading="status.loadingStart"
      :disabled="!emptyRoom"
      />
    </div>

  </div>
</template>

<script>
import socketService from '@/socket';
import BaseButton from '@/components/BaseButton.vue';
import GameTitle from '@/components/GameTitle.vue';

const { emitEvents, listenEvent } = socketService;

export default {
  name: 'Room',
  components: { GameTitle, BaseButton },
  data() {
    return {
      status: {},
    };
  },
  computed: {
    roomData() { return this.$store.state.socket.room; },
    statusData() { return this.$store.state.socket.status; },
    // TODO: revert constraint of > 1 users in room to start
    emptyRoom() { return this.$store.state.socket.room.users.length > 0; },
  },
  mounted() {
    listenEvent('start_game', () => {
      this.$router.replace({ name: 'Game' });
    });
  },
  methods: {
    handleStartGame() {
      this.status = { loadingStart: true };
      console.log('room id: ', this.roomData.roomID);
      emitEvents.startGame(this.roomData.roomID);
    },
  },
};
</script>

<style lang="scss" module>

.component-container {
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-content {
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.room-content {
  flex-grow: 1;
  text-align: center;
  margin-top: 50px;
}

.connected-users {
  flex-grow: 4;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}

.connected-users .title {
  margin-bottom: 20px;
}

.connected-users .user {
  padding: 10px;
}

.user-content {}

.bottom-content {
  flex-grow: 3;
  justify-content: flex-start;
}

</style>
