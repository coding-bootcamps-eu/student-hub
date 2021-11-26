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
    <ul>
      <legend>ComparedLPs</legend>
      <li
        v-for="comparedLP in comparedLPs"
        :key="comparedLP.lpKey"
        v-bind="comparedLP"
      >
        <p>LPKEY from Student {{ comparedLP.studentLP.lpKey }}</p>
        <p>LPValue from Student {{ comparedLP.studentLP.lpData.basicLP }}</p>
        <p>LPKEY from answer {{ comparedLP.lpKey }}</p>
        <p>TeacherID {{ comparedLP.answeredLP.lpData.teacherID }}</p>
        <p>TEacherValue {{ comparedLP.answeredLP.lpData.basicLP }}</p>
      </li>
    </ul>
  </section>
  <AddLPAnswer />
  <cbe-main-btn class="secondary" @click="compareLPs">Compare</cbe-main-btn>
</template>

<script>
import AddLP from "@/components/StorePreperation/AddLP.vue";
import ReadLP from "@/components/StorePreperation/ReadLP.vue";
import AddLPAnswer from "@/components/StorePreperation/AddLPAnswer";
export default {
  name: "TestAreaView",
  data() {
    return {
      comparedLPArray: [],
    };
  },
  computed: {
    studentLP() {
      return this.$store.getters.getStudentLP;
    },
    answeredLP() {
      return this.$store.getters.getAnsweredLP;
    },
    comparedLPs() {
      return this.comparedLPArray;
    },
  },
  methods: {
    compareLPs() {
      this.studentLP.forEach((lp) => {
        this.answeredLP.forEach((lpAnswer) => {
          if (lp.lpKey === lpAnswer.lpData.lpKey) {
            console.log("lp", lp);
            console.log("lpAnswer", lpAnswer);
            this.comparedLPArray.push({
              lpKey: lp.lpKey,
              studentLP: lp,
              answeredLP: lpAnswer,
            });
            console.log("ComparedLPArray", this.comparedLPArray);
          }
        });
      });
    },
  },
  components: {
    AddLP,
    ReadLP,
    AddLPAnswer,
  },
};
</script>
