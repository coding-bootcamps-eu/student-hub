<template>
  <section class="lpformwith">
    <legend>{{ lpLegend }}</legend>
    <LPSlideBar
      @sliderValue="this.sliderValue = $event"
      @change="changeComponentOutput"
    />
    <textarea
      placeholder="Bitte gebe einen zusätzlichen Kommentar ab."
      v-model="inputValue"
      @change="changeComponentOutput"
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
    modelValue: {
      type: [String, Number],
    },
    lpSliderPropertie: {
      type: [String, Number],
    },
  },
  methods: {
    changeComponentOutput() {
      this.updateValue(this.inputValue);
      this.updateSliderValue(this.sliderValue);
    },
    resetInput() {
      this.inputValue = "";
      this.sliderValue = 1;
    },
    updateValue(value) {
      this.$emit("lp-value", value);
    },
    updateSliderValue(value) {
      this.$emit("slider-value", value);
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
