<template>
  <div :class="$style['component-container']">
    <button
    :disabled="disabled || loading"
    @click="$emit('clicked')"
    :class="$style['button']">
      {{ loading ? 'LOADING...' : text }}
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

<style lang="scss" module>

.component-container {
  text-align: center;
  outline: 1px solid red;
}

.button {
  outline: 1px solid red;
  width: 200px;
  height: 60px;
  background-color: red;
  border-radius: 50px;
  outline: none;
}

.button:active {
  transform: translateY(4px);
}

</style>
