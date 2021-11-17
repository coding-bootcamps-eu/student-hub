<template>
  <AddLP />
  <ReadLP />
  <section>
    <ul>
      <li v-for="(lp, idx) in studentLP" :key="idx" v-bind="lp">
        {{ lp.author }}
        {{ lp.answerNeeded }}
      </li>
    </ul>
  </section>
  <AddLPAnswer />
</template>

<script>
import AddLP from "@/components/StorePreperation/AddLP.vue";
import ReadLP from "@/components/StorePreperation/ReadLP.vue";
import AddLPAnswer from "@/components/StorePreperation/AddLPAnswer";
export default {
  name: "TestAreaView",
  computed: {
    studentLP() {
      return this.$store.getters.getStudentLP;
    },
  },
  components: {
    AddLP,
    ReadLP,
    AddLPAnswer,
  },
};
</script>
