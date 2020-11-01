<template>
  <div
  class="absolute h-full w-full flex flex-col items-center
        overflow-y-scroll overflow-x-hidden">
    <div
    class="p-4 text-4xl text-center w-full"
    v-for="(user, index) in testUsers"
    :key="index"
    >
      {{ user }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'UsersList',
  props: {
    users: { type: Array, required: true },
  },
  data() {
    return {
      testUsers: ['sdfsdfsf', 'sdfsdfsf', 'sdfsdfsf', 'sdfsdfsf', 'sdfsdfsf',
        'sdfsdfsf', 'sdfsdfsf', 'sdfsdfsf', 'sdfsdfsf', 'sdfsdfsf', 'sdfsdfsf'],
    };
  },
};
</script>
