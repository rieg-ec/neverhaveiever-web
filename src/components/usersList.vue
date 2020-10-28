<template>
  <div class="overflow-y-scroll overflow-x-hidden w-1/2">
    <div class="flex-grow flex-col px-6 items-center">
      <div
      class="py-2 text-4xl flex-wrap w-full text-center"
      v-for="(user, index) in users"
      :key="index"
      >
        {{ user }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'usersList',
  props: {
    users: { type: Array, required: true },
  },
};
</script>

<style module>
</style>
