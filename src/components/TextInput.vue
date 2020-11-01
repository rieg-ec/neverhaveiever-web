<template>
  <div
  class="flex items-center border-b py-2 w-full
        border-gray-200 active:border-deep-purple-400-accent"
  >
    <div class="absolute top-0" v-for="(error, index) in errors" :key="index">
      <label
      v-if="error.display"
      class="text-sm text-red-500"
      >
        {{ error.message }}
      </label>
    </div>

    <input
    class="appearance-none bg-transparent w-full
          text-gray-700 px-4 leading-tight
          focus:outline-none"
    type="text"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
    >
  </div>
</template>

<script>

export default {
  name: 'textInput',
  props: {
    placeholder: { type: String, required: true },
    value: { type: String },
    errors: { type: Object },
  },
};
</script>

<style module>
</style>
