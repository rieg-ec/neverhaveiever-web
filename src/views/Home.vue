<template>
  <div :class="$style['component-container']">

    <div :class="$style['title']">
      <GameTitle />
    </div>

    <div :class="$style['top-content']">

      <div :class="$style['inputs-container']">
        <div :class="$style['input']">
          <label v-if="errors.roomRequestFailure">Invalid room id</label>
          <input type="text" placeholder="Enter room ID" v-model="roomID">
        </div>

        <div :class="$style['input']">
          <label v-if="errors.usernameExists">Username exists.</label>
          <input type="text" placeholder="Enter your name" v-model="username">
        </div>
      </div>

      <div :class="$style['create-room']">
        <BaseButton
        :disabled="!validUsername"
        @clicked="handleCreate"
        :loading="status.loadingCreate"
        :text="'CREATE ROOM'"
        />

        <label v-if="errors.createRoomFailure">Could not create room. Try again.</label>
      </div>

      <div :class="$style['join-room']">
        <BaseButton
        :disabled="!validUsername || !validRoomID"
        @clicked="handleJoin"
        :loading="status.loadingJoin"
        :text="'JOIN ROOM'"
        />
      </div>

    </div>

  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import GameTitle from '@/components/GameTitle.vue';
import socketService from '@/socket';

const { emitEvents, listenEvent } = socketService;

export default {
  name: 'Home',
  components: { BaseButton, GameTitle },
  data() {
    return {
      username: '',
      roomID: '',
      errors: {},
      status: {},
    };
  },
  computed: {
    validRoomID() {
      if (this.roomID !== '') {
        return true;
      }
      return false;
    },
    validUsername() {
      if (this.username !== '') {
        // TODO: username validation
        return true;
      }
      return false;
    },
  },
  watch: {
    username(value) {
      this.errors.usernameExists = false;
      this.$store.dispatch('socket/updateUsername', value);
    },
    roomID() { this.errors.roomRequestFailure = false; },
  },
  mounted() {
    listenEvent('username_exists', () => {
      this.status = {};
      this.errors = { usernameExists: true };
    });

    listenEvent('room_request_failure', (roomID) => {
      console.log('failed to join room in Home.vue', roomID);
      this.status = {};
      this.errors = { roomRequestFailure: true };
    });

    listenEvent('create_room_failure', (roomID) => {
      console.log('failed to create room in Home.vue', roomID);
      this.status = {};
      this.errors = { createRoomFailure: true };
    });

    listenEvent('room_request_success', (roomID, users) => {
      console.log('room_request_success event:', roomID, users, 'in Home.vue');
      this.$store.dispatch('socket/roomRequestSuccess', { roomID, users });
      this.$router.replace({ name: 'Room' });
    });

    listenEvent('create_room_success', (roomID) => {
      console.log('create_room_success event in Home.vue', roomID);
      this.$store.dispatch('socket/createRoomSuccess', roomID);
      this.$router.replace({ name: 'Room' });
    });
  },
  methods: {
    handleCreate() {
      try {
        console.log('creating room in Home.vue');
        this.status = { loadingCreate: true };
        emitEvents.leaveRoom();
        emitEvents.createRoom(this.username);
        // TODO: set timeout
      } catch (err) {
        console.log(err);
      }
    },
    handleJoin() {
      try {
        console.log(`joining room ${this.roomID} with username ${this.username} in Home.vue`);
        this.status = { loadingJoin: true };
        emitEvents.leaveRoom();
        emitEvents.roomRequest(this.roomID, this.username);
        // TODO: set timeout
      } catch (err) {
        // TODO: dispatch error to socket store
        // TODO: after x seconds, stop waiting for socket and dispatch error?
        console.log(err, 'in Home.vue');
      }
    },
  },
};
</script>

<style lang="scss" module>

.component-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  padding: 50px;
}

.top-content {
  display: flex;
  flex-direction: column;
}

.top-content > * {
  margin: 3vh;
}

.top-content .create-room {
  text-align: center;
}

.top-content .join-room {
  text-align: center;
}

.top-content .inputs-container {
  display: flex;
  flex-direction: column;
}

.top-content .inputs-container .input {
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
}

.top-content .inputs-container .input input {
  padding: 5px;
}

.top-content .inputs-container .input label {
  position: absolute;
  top: 0px;
}

</style>
