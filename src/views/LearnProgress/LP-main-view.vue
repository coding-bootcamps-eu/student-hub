<template>
  <LPForm />
</template>

<script>
import LPForm from "@/components/LPLearnProgress/LPForm.vue";
export default {
  name: "LPMainView",
  components: {
    LPForm,
  },
  data() {
    return {
      student: true,
      teacher: false,
    };
  },
};
</script>
