<template>
  <div class="w-full h-full flex flex-col items-center">
    <div class="pt-32 flex flex-col items-center">
      <div class="p-10">
        "<b>{{ $store.state.socket.room.statement }}</b>"
      </div>

      <p class="text-center mb-2"><b>Mas votados:</b></p>
      <div class="w-64 flex justify-center text-center m-6 bg-gray-100
                  shadow-md rounded ">
        <table :class="$style.table" class="w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Votos</th>
            </tr>
          </thead>
          <tbody>
            <tr
            v-for="([username, quantity], index) in votes"
            :key="index"
            >
              <td>{{ username }}</td>
              <td>{{ quantity }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

    <div class="mt-12">
        <BaseButton
        v-if="!this.status.ready"
        @clicked="handleReady"
        :loading="status.loadingReady"
        :text="'NEXT ROUND'"
        />

        <div v-else class="flex flex-col items-center">
          <div v-for="(username, index) in notReadyUsernames" :key="index">
            <p>{{ username }}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue';
import socketService from '@/socket';

const { emitEvents, listenEvent } = socketService;

export default {
  name: 'Summary',
  components: { BaseButton },
  data() {
    return {
      status: {},
      notReadyUsernames: [],
    };
  },
  created() {
    // make a copy bc we wan't votes to persist if a user leaves
    this.votes = [...Object.entries(this.$store.state.socket.room.roundStats.votes)];

    listenEvent('ready_success', (notReadyUsernames) => {
      this.status = { ready: true };
      this.notReadyUsernames = notReadyUsernames;
    });

    listenEvent('next_round', () => {
      this.$router.replace({ name: 'Game' });
    });
  },
  methods: {
    handleReady() {
      this.status = { loadingReady: true };
      emitEvents.ready();
    },
  },
};
</script>

<style module>

.table, .table th, .table td {
  padding: 10px;
}

</style>
