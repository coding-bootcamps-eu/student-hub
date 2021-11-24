<template>
  <AddLP />
  <ReadLP />
  <section>
    <ul>
      <li v-for="lp in studentLP" :key="lp.lpKey" :lpKey="lp.lpKey" v-bind="lp">
        <router-link :to="{ name: 'lpDetail', params: { lpKey: lp.lpKey } }">
          {{ lp.lpKey }}
        </router-link>
        {{ lp.lpData.studentName }}
        {{ lp.lpData.answerNeeded }}
      </li>
    </ul>
    <ul>
      <li
        v-for="lp in answeredLP"
        :key="lp.lpKey"
        v-bind="lp"
        :lpKey="lp.lpKey"
      >
        {{ lp.lpData.teacherID }} , {{ lp.lpData.answerNeeded }}
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
    answeredLP() {
      return this.$store.getters.getAnsweredLP;
    },
  },
  components: {
    AddLP,
    ReadLP,
    AddLPAnswer,
  },
};
</script>
