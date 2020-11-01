<template>
  <div class="flex flex-col w-full">
    <div class="py-20 text-center text-4xl">
        NUNCA NUNCA...
    </div>

    <div class="flex flex-col">
      <div class="flex flex-col items-center py-8">
        <div class="relative py-8 w-64">
          <TextInput
          :placeholder="'Ingresa el ID de alguna sala'"
          :errors="[ { display: errors.joinRoomFailure, message: 'ID de sala invalido' } ]"
          v-model:value="roomID"
          />
        </div>

        <div class="relative py-8 w-64">
          <TextInput
          :placeholder="'Ingresa tu nombre'"
          :errors="[
            { display: errors.usernameExists, message: 'Nombre en uso' },
            { display: errors.createRoomFailure, message: 'Hubo un problema, intenta de nuevo' },
          ]"
          v-model:value="username"
          />
        </div>
      </div>

      <div class="flex justify-center py-4">
        <BaseButton
        :disabled="!validUsername"
        @clicked="handleCreate"
        :loading="status.loadingCreate"
        :text="'crear'"
        />
      </div>

      <div class="flex justify-center py-4">
        <BaseButton
        :disabled="!validUsername || !validRoomID"
        @clicked="handleJoin"
        :loading="status.loadingJoin"
        :text="'ingresar'"
        />
      </div>

    </div>

  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import TextInput from '@/components/TextInput.vue';
import socketService from '@/socket';

const { socket } = socketService;

export default {
  name: 'Home',
  components: { BaseButton, TextInput },
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
    roomID() { this.errors.joinRoomFailure = false; },
  },
  created() {
    socket.on('username_exists', () => {
      this.status = {};
      this.errors = { usernameExists: true };
    });

    socket.on('join_room_failure', () => {
      this.status = {};
      this.errors = { joinRoomFailure: true };
    });

    socket.on('create_room_failure', () => {
      this.status = {};
      this.errors = { createRoomFailure: true };
    });

    socket.on('join_room_success', (roomID) => {
      this.$store.dispatch('socket/joinRoomSucess', roomID);
      this.$router.replace({ name: 'Room' });
    });

    socket.on('create_room_success', (roomID) => {
      this.$store.dispatch('socket/createRoomSuccess', roomID);
      this.$router.replace({ name: 'Room' });
    });
  },
  methods: {
    handleCreate() {
      this.status = { loadingCreate: true };
      socket.emit('create_room', this.username);
      // TODO: set timeout
    },
    handleJoin() {
      this.status = { loadingJoin: true };
      socket.emit('join_room', this.roomID, this.username);
      // TODO: set timeout
    },
  },
};
</script>
