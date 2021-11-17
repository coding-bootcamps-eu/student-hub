<template>
  <section>
    <form>
      <div>
        <LPFormFieldWithBar />
        <LPFormFieldWithBar />
        <LPFormFieldWithBar />
        <LPFormFieldWithBar />
        <LPFormFieldWithoutBar />
        <LPFormFieldWithoutBar />
        <LPFormFieldWithoutBar />
        <LPFormFieldWithoutBar />
      </div>
      <div>
        <cbe-main-btn buttonClass="secondary">Text</cbe-main-btn>
      </div>
    </form>
  </section>
</template>

<script>
import LPFormFieldWithBar from "@/components/LPFormField/LPFormFieldWithBar.vue";
import LPFormFieldWithoutBar from "@/components/LPFormField/LPFormFieldWithoutBar.vue";
export default {
  name: "LPForm",
  components: {
    LPFormFieldWithBar,
    LPFormFieldWithoutBar,
  },
};
</script>

<style scoaped>
button {
  background: rebeccapurple;
  width: 150px;
  height: 40px;
  border-radius: 10px;
}
.button-abbruch {
  float: left;
  margin-top: -20px;
}
.button-send {
  float: right;
  margin-top: -20px;
}
</style>
