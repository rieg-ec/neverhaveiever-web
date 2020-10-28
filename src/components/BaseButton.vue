<template>
  <div class="outline-none">
    <button type="button"
    :disabled="disabled || loading"
    @click="$emit('clicked')"
    class="bg-purple-700 text-white font-bold
          py-4 px-6 flex justify-center items-center
          rounded-full shadow-2xl focus:outline-none"
    :class="[$style.button,
            { 'transition duration-200 hover:bg-purple-400': !loading && !disabled,
              'transform active:translate-y-2': !loading && !disabled
            }]"
    >
      {{ loading ? '' : text }}
      <div :class="$style.spinner" v-if="loading"></div>
    </button>
  </div>
</template>

<script>

export default {
  name: 'BaseButton',
  props: {
    loading: { type: Boolean, default: false },
    text: { type: String, required: true },
    disabled: { type: Boolean, default: false },
  },
  components: {},
};
</script>

<style module>
.button {
  width: 250px;
  height: 65px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner {
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 6px solid theme(colors.purple.700);
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}
</style>
