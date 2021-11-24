<template>
  <section class="lpformwith">
    <legend data-cy="legend-question">{{ lpLegend }}</legend>
    <LPSlideBar
      @slider-value="this.sliderValue = $event"
      @input="updateSliderValue"
      ref="slideBarComponent"
    />
    <textarea
      placeholder="Bitte gebe einen zusätzlichen Kommentar ab."
      v-model="inputValue"
      @input="updateValue"
      data-cy="textarea-text-valuation"
    ></textarea>
  </section>
</template>

<script>
import LPSlideBar from "@/components/LPFormField/LPSlideBar.vue";

export default {
  emits: ["lp-value", "slider-value"],
  name: "LPFormFieldWithBar",
  components: {
    LPSlideBar,
  },
  data() {
    return {
      inputValue: "",
      sliderValue: 1,
    };
  },
  props: {
    lpLegend: {
      type: String,
    },
  },
  methods: {
    resetInput() {
      this.inputValue = "";
      this.sliderValue = 1;
      this.$refs.slideBarComponent.lpSliderValue = 1;
      this.$refs.slideBarComponent.$refs.slideBar.value = 1;
    },
    updateValue() {
      this.$emit("lp-value", event.target.value);
    },
    updateSliderValue() {
      this.$emit("slider-value", event.target.value);
    },
  },
};
</script>

<style scoped>
.lpformwith {
  border: 1px solid var(--primary-color);
  margin-bottom: 1.5rem;
  border-radius: 0.25rem;
  margin: 1.5rem 4rem 0.8rem 2.5rem;
}

textarea {
  min-width: 350px;
  max-width: 120ch;
  border: 1px solid var(--secondary-color);
  border-radius: 0.25rem;
  min-height: 5rem;
  max-height: 30vh;
}
legend {
  text-align: left;
  padding: 0 0.25rem;
  margin: 0.5rem;
  border: 1px dotted var(--secondary-color);
  border-radius: 0.25rem;
  font-size: 0.8em;
}
</style>
