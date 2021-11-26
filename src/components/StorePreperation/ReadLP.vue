<template>
  <cbe-main-btn buttonClass="primary" @click="readLP">ReadLP</cbe-main-btn>
  <cbe-main-btn buttonClass="primary" @click="readAnsweredLP"
    >ReadAnsweredLP</cbe-main-btn
  >
</template>

<script>
export default {
  name: "ReadLP",
  methods: {
    async readLP() {
      await this.$store.dispatch("setStudentLP", {
        studentID: this.$store.getters.getCurrentUserID,
      });
    },
    async readAnsweredLP() {
      await this.$store.dispatch("setAnsweredLP", {
        studentID: this.$store.getters.getCurrentUserID,
      });
    },
  },
};
</script>
