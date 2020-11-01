<template>
  <div class="outline-none">
    <button type="button"
    :disabled="disabled || loading"
    @click="clickEvent"
    class="bg-deep-purple-200-accent text-deep-purple-400-accent-contrast font-mono
          py-2 px-6 rounded text-center overflow-hidden
          shadow-2xl focus:outline-none"

    :class="[
      $style.button,
      { 'hover:opacity-75': !loading && !disabled },
      { 'bg-deep-purple-400-accent': !loading && !disabled },
    ]"
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
  methods: {
    clickEvent(e) {
      this.$emit('clicked');
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      const ripple = document.createElement('span');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      document.querySelector(`.${this.$style.button}`).appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    },
  },
};
</script>

<style module>
.button {
  width: 200px;
  height: 45px;
  position: relative;
  text-transform: uppercase;
  cursor: pointer;
  background-position: center;
  transition: background 0.8s;
}

.button span {
  position: absolute;
  background: #fff;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: animate 0.5s linear forwards;
}

@keyframes animate {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.5;
  }
  100% {
    width: 500px;
    height: 500px;
    opacity: 0;
  }
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
