<template>
  <div class="flex flex-col w-full h-full">
    <div class="py-20 text-center text-4xl">
      GUESS WHO
    </div>

    <div class="flex flex-col h-full">
      <div class="flex flex-col items-center py-8">
        <div class="relative py-8">
          <!-- TODO: test error label  -->
          <label
          v-if="errors.roomRequestFailure"
          class="absolute top-0 px-6 text-sm text-red-500"
          >
            Invalid room id
          </label>

          <input
          class="bg-gray-200 appearance-none border-2 w-64
                rounded-full outline-none py-4 px-4 text-gray-700
                focus:bg-white focus:border-purple-700 shadow"
          :class="errors.roomRequestFailure ? 'border-red-500' : 'border-gray-200'"
          type="text"
          placeholder="Enter room ID"
          v-model="roomID"
          >
        </div>

        <div class="relative py-8">

          <label
          v-if="errors.usernameExists"
          class="absolute top-0 px-6 text-sm text-red-500"
          >
            Username exists.
          </label>

          <input
          class="bg-gray-200 appearance-none border-2 w-64
                rounded-full outline-none py-4 px-4 text-gray-700
                focus:bg-white focus:border-purple-700 shadow"
          :class="errors.createRoomFailure ? 'border-red-500' : 'border-gray-200'"
          type="text"
          placeholder="Enter your name"
          v-model="username"
          >
        </div>
      </div>

      <div class="flex justify-center py-4">
        <BaseButton
        :disabled="!validUsername"
        @clicked="handleCreate"
        :loading="status.loadingCreate"
        :text="'CREATE ROOM'"
        />
      </div>

      <div class="flex justify-center py-4">
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
import socketService from '@/socket';

const { emitEvents, listenEvent } = socketService;

export default {
  name: 'Home',
  components: { BaseButton },
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
  created() {
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

<style module>

</style>
