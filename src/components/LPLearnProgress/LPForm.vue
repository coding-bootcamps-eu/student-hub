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
        <button>Abrechen</button>
        <button>Abschicken</button>
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

<style></style>
