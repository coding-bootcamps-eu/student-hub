<template>
  <section>
    <input
      type="range"
      id="slider-value"
      min="1"
      max="10"
      step="1"
      value="1"
      :v-model="sliderValue"
      ref="slideBar"
      @input="updateValue"
    />
    <label for="slider-value">{{ lpSliderValue }}</label>
  </section>
</template>

<script>
export default {
  name: "LPSlideBar",
  data() {
    return {
      lpSliderValue: 1,
    };
  },
  props: {
    sliderValue: {
      type: [Number, String],
    },
  },
  emits: ["slider-value"],
  methods: {
    updateValue(event) {
      this.$emit("slider-value", event.target.value);
      this.lpSliderValue = event.target.value;
    },
  },
};
</script>

<style scoped>
#slider-value {
  accent-color: var(--primary-color);
}
</style>
