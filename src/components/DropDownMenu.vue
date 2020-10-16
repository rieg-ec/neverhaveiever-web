<template>
  <div :class="$style['component-container']">

    <div :class="$style['title']">{{ title }}</div>

    <div
    :class="[
      $style['select-container'],
      {[$style.active]: toggled}
    ]"
    >

      <ul @click="toggleMenu" :class="$style['selected']">
        <li>
          <div :class="$style['option']">
            {{ optionSelected || options[0] }}
          </div>
        </li>
      </ul>

      <ul :class="$style['options']">

        <li
        v-for="(option, index) in availableOptions" :key="index"
        @click="selectOption(option)"
        >
          <div :class="$style['option']">
            <p>{{ option }}</p>
          </div>

        </li>

      </ul>

    </div>
  </div>
</template>

<script>

export default {
  name: 'DropDownMenu',
  components: {},
  props: {
    title: { type: String, require: true },
    active: { type: Boolean, default: true },
    options: { type: Array },
  },
  data() {
    return {
      toggled: false,
      optionSelected: null,
    };
  },
  mounted() {
    // eslint-disable-next-line prefer-destructuring
    this.optionSelected = this.options[0];
  },
  computed: {
    availableOptions() {
      const optionsArray = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const option of this.options) {
        if (!(this.optionSelected === option)) {
          optionsArray.push(option);
        }
      }

      return optionsArray;
    },
  },
  methods: {
    selectOption(option) {
      this.optionSelected = option;
      this.$emit('selection', option);
      this.toggled = !this.toggled;
    },
    toggleMenu() { this.toggled = !this.toggled; },
  },
};
</script>

<style module lang="scss">
$base-color: #fff;

.select-container {
  outline: 1px solid red;
}

.selected {
  outline: 1px solid red;
}

.option {
  outline: 1px solid red;
}

.options {
  outline: 1px solid red;
}

.component-container {
  color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  margin-top: 30px;
}

.select-container {
  height: 200px;
}

.select-container ul {
  position: relative;
  background-color: $base-color;
  cursor: pointer;
  user-select: none;
  list-style: none;
  border-radius: 5px;
}

.selected {
  padding-inline-start: 0 !important;
  text-align: center;
  width: 250px;
  height: 50px;
}

.selected:after {
  content: "";
  position: absolute;
  right: 0px;
  top: -8px;
  width: 6px;
  height: 6px;
  border: 2px solid;
  margin: 20px 15px 20px 30px;
  border-color: transparent transparent #555555 #555555;
  transform: rotate(-45deg);
}

.active .selected:after {
  top: -3px;
  transform: rotate(-225deg);
}

.options {
  color: blue;
  // position: absolute;
  display: block;
  text-align: center;
  padding: 10px;
  top: -10px;
  transition: height .4s ease-out, opacity .1s ease-in;
  opacity: 0;
  height: 0px;
}

.active .options {
  color: red;
  opacity: 1;
  height: 200px;
}

.option {
  padding: 15px 20px;
}

</style>
