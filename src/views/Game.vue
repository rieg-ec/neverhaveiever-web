<template>
  <div class="w-full h-full flex flex-col items-center">

      <div v-if="!status.submittedStatement"
        class="w-full h-full my-32 flex flex-col justify-center items-center"
      >
          <div class="px-8 flex flex-col justify-center flex-grow">
            <TextInput
            :placeholder="'Nunca Nunca...'"
            v-model:value="statement"
            />
          </div>
          <div class="text-center flex flex-col justify-center flex-grow">
            <BaseButton
            :disabled= "!statement"
            @clicked="sendStatement"
            :text="'enviar'"
            />
          </div>
      </div>

      <div v-else class="w-full h-full text-center my-48">
        <div v-if="usersWithoutStatement.length" class="flex flex-col items-center">
          <p class="pb-10">Listo! esperando a:</p>
          <div class="relative w-48 h-1/2 sm:w-64 flex justify-center">
            <UsersList :users="usersWithoutStatement"/>
          </div>
        </div>

        <div v-else>
          <p>Todos votaron. Esperando al servidor...</p>
        </div>
      </div>

  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import UsersList from '@/components/UsersList.vue';
import TextInput from '@/components/TextInput.vue';
import socketService from '@/socket';

const { socket } = socketService;

export default {
  name: 'Game',
  components: { BaseButton, UsersList, TextInput },
  data() {
    return {
      status: {},
      statement: null,
      usersWithoutStatement: this.$store.state.socket.room.users,
    };
  },
  created() {
    socket.on('users_without_statement', (users) => {
      this.usersWithoutStatement = users;
    });

    // TODO: make server event to transition to statement view before this
    socket.on('start_statements', () => {
      this.$router.replace({ name: 'Statements' });
    });
  },
  methods: {
    sendStatement() {
      this.status = { submittedStatement: true };
      socket.emit(
        'submit_statement', this.statement,
        this.$store.state.socket.room.roomID,
      );
    },
  },
};
</script>
