<template>
  <div :class="$style['component-container']">
    <div :class="$style['top-content']">
      <div :class="$style['statement']">
        "<b>{{ $store.state.socket.room.statement }}</b>"
      </div>

      <p><b>Mas votados:</b></p>
      <div :class="$style['most-voted']">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Votos</th>
            </tr>
          </thead>
          <tbody>
            <tr
            v-for="(username, index) in $store.state.socket.room.roundStats.mostVoted"
            :key="index"
            >
              <td>{{ username }}</td>
              <td>{{ $store.state.socket.room.roundStats.reps }}</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

    <div :class="$style['bottom-content']">
        <BaseButton
        v-if="!this.status.ready"
        :disabled="status.ready"
        @clicked="handleReady"
        :loading="status.loadingReady"
        :text="'NEXT ROUND'"
        />

        <div :class="$style['not-ready-usernames']">
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
  mounted() {
    listenEvent('ready_success', (notReadyUsernames) => {
      this.status = { ready: true };
      this.notReadyUsernames = notReadyUsernames;
      console.log(this.notReadyUsernames);
    });

    listenEvent('next_round', () => {
      this.$router.replace({ name: 'Game' });
    });
  },
  computed: {},
  methods: {
    handleReady() {
      this.status = { loadingReady: true };
      emitEvents.ready();
    },
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
  padding-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-content .statement {
  flex-grow: 1;
  text-align: center;
}

.top-content .most-voted {
  flex-grow: 2;
  margin: 20px;
  padding: 5px;
  background-color: pink;
  border-radius: 8px;
  box-shadow: 0px 0px 6px 1px #000000;
}

.top-content .most-voted table {
  border-spacing: .5rem;
}

.top-content .most-voted td, .top-content .most-voted th {
  text-align: center;
}

.bottom-content {
  flex-grow: 2;
  margin-top: 5vh;
}

.bottom-content .not-ready-usernames {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
