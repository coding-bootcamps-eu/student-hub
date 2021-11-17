<template>
  <section>
    <input class="s" type="range" id="slider-value" min="1" max="10" step="1" />
    <label for="slider-value"></label>
  </section>
</template>

<script>
export default {
  name: "LPSlideBar",
};
</script>

<style scoped>
input {
  color: #9146ff;
  background-color: #9146ff;
  width: 95%;
}
input::-webkit-slider-thumb {
  color: #9146ff;
  background-color: #9146ff;
  width: 95%;
}
-webkit-slider-thumb {
  color: #000;
}
</style>
