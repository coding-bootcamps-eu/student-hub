<template>
  <section>
    <input
      type="range"
      id="slider-value"
      min="1"
      max="10"
      step="1"
      v-model="value"
      data-cy="input-range-valuation"
    />
    <label for="slider-value">{{ value }}</label>
  </section>
</template>

<script>
export default {
  name: "LPSlideBar",
  data() {
    return {
      value: 1,
    };
  },
};
</script>

<style scoped>
#slider-value {
  accent-color: var(--primary-color);
}
</style>
