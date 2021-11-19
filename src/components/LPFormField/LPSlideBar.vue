<template>
  <section>
    <input
      class=".slidingTool"
      type="range"
      id="slider-value"
      min="1"
      max="10"
      step="1"
    />
    <label for="slider-value"></label>
  </section>
</template>

<script>
export default {
  name: "LPSlideBar",
};
</script>

<style scoped>
.slidingTool {
  -webkit-appearance: none;
  appearance: none;
  background-color: red;
  /*height: 0.5rem;*/
  border-radius: 0.5rem;
}

.slidingTool::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.5rem;
  /*height: 1.5rem;*/
  background: red;
  border-radius: 50%;
}
</style>
