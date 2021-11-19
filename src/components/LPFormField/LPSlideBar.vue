<template>
  <section>
    <input
      type="range"
      id="slider-value"
      min="1"
      max="10"
      step="1"
      :v-model="sliderValue"
      @input="updateValue"
    />
    <label for="slider-value">{{ slider }}</label>
  </section>
</template>

<script>
export default {
  name: "LPSlideBar",
  emits: ["slider-value"],
  props: {
    slider: {
      type: Number,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("slider-value", event.target.value);
    },
  },
};
</script>

<style scoped>
#slider-value {
  accent-color: var(--primary-color);
}
</style>
