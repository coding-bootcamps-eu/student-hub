<template>
  <section>
    <form @input="updateLP">
      <div>
        <LPFormFieldWithBar
          :lpLegend="'Bewerte den allgemeinen Fortschritt von ' + studentName"
          @lp-value="this.currentLP.basicLPComment = $event"
          @slider-value="currentLP.basicLP = $event"
          ref="basicLearningInput"
        />
        <LPFormFieldWithBar
          :lpLegend="'Wie fit fühlt sich ' + studentName + ' in HTML?'"
          @lp-value="this.currentLP.htmlLPComment = $event"
          @slider-value="currentLP.htmlLP = $event"
          ref="htmlLearningInput"
        />
        <LPFormFieldWithBar
          :lpLegend="'Wie fit und wohl fühlt sich ' + studentName + ' in CSS?'"
          @lp-value="this.currentLP.cssLPComment = $event"
          @slider-value="currentLP.cssLP = $event"
          ref="cssLearningInput"
        />
        <LPFormFieldWithBar
          :lpLegend="
            'Wie fit und wohl fühlt sich ' + studentName + ' in JavaScript?'
          "
          @lp-value="this.currentLP.jsLPComment = $event"
          @slider-value="currentLP.jsLP = $event"
          ref="jsLearningInput"
        />
        <LPFormFieldWithoutBar
          :lpLegend="'Was lief deiner Meinung nach gut für ' + studentName"
          lp__placeholder="Beschreibe was deiner Meinung nach gut für dich lief..."
          @lp-value-without-bar="this.currentLP.goodInCourse = $event"
          ref="goodInCouseInput"
        />
        <LPFormFieldWithoutBar
          :lpLegend="'Was könnte ' + studentName + ' besser machen?'"
          lp__placeholder="Beschreibe was du gerne besser machen würdest..."
          @lp-value-without-bar="this.currentLP.improvements = $event"
          ref="improvementsInput"
        />
        <LPFormFieldWithoutBar
          :lpLegend="'Was läuft bei ' + studentName + ' gut im Kurs?'"
          lp__placeholder="Beschreibe was du am Kurs gut findest..."
          @lp-value-without-bar="this.currentLP.whatWasGood = $event"
          ref="whatWasGoodInput"
        />
        <LPFormFieldWithoutBar
          :lpLegend="
            'Was würdest du gerne bei ' + studentName + 'verbessert sehen?'
          "
          lp__placeholder="Beschreibe was du am Kurs verbessern würdest..."
          @lp-value-without-bar="this.currentLP.whatCouldBeBetter = $event"
          ref="whatCouldBeBetterInput"
        />
      </div>
      <div class="button-wrapper">
        <input type="reset" value="Reset" class="cbe-reset-btn" />
        <cbe-main-btn
          buttonClass="primary"
          @click="createLP"
          data-cy="form-send-button"
          >Abschicken</cbe-main-btn
        >
      </div>
    </form>
  </section>
</template>

<script>
import LPFormFieldWithBar from "@/components/LPFormField/LPFormFieldWithBar.vue";
import LPFormFieldWithoutBar from "@/components/LPFormField/LPFormFieldWithoutBar.vue";

import firestore from "@/firestore";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

export default {
  name: "LPTeacherForm",
  props: {
    studentName: {
      type: String,
    },
    studentID: {
      type: String,
    },
    teacherID: {
      type: String,
    },
    lpKey: {
      type: String,
    },
  },
  data() {
    return {
      currentLP: {
        teacherID: this.teacherID,
        studentID: this.studentID,
        studentName: this.studentName,
        lpKey: this.lpKey,
        basicLP: 0,
        basicLPComment: "",
        cssLP: 0,
        cssLPComment: "",
        htmlLP: 0,
        htmlLPComment: "",
        jsLP: 0,
        jsLPComment: "",
        goodInCourse: "",
        improvements: "",
        whatCouldBeBetter: "",
        whatWasGood: "",
        answerNeeded: true,
      },
    };
  },
  components: {
    LPFormFieldWithBar,
    LPFormFieldWithoutBar,
  },
  methods: {
    updateLP() {
      this.currentLP.studentName = this.studentName;
      this.currentLP.studentID = this.studentID;
      this.$store.commit("setCurrentLP", {
        currentLP: this.currentLP,
      });
    },
    async createLP(e) {
      this.currentLP.answerNeeded = false;
      this.currentLP.studentName = this.studentName;
      this.currentLP.studentID = this.studentID;
      e.preventDefault();
      await addDoc(collection(firestore, "lp-answer"), this.currentLP);
      const studentLPRef = doc(firestore, "learn-progress", this.lpKey);
      await updateDoc(studentLPRef, {
        answerNeeded: false,
      });
      this.$router.push("teacherhub");
    },
  },
};
</script>

<style lang="scss" scoped>
.cbe-reset-btn {
  color: var(--background-color);
  font-weight: bold;
  background-color: var(--primary-color);
  border: 2.5px solid transparent;
  border-radius: 0.25rem;
  padding: 0.3rem 0.7rem;
  font-family: "Open Sans", sans-serif;
  font-size: 18px;
  line-height: 1.5rem;
}
.cbe-reset-btn:focus {
  outline: none;
  border: 2.5px solid var(--success-color);
}
.button-wrapper {
  display: flex;
  margin: 1.5rem 4rem 0.8rem 2.5rem;
  justify-content: space-evenly;
}

@media screen and (max-width: 975px) {
  .cbe-reset-btn {
    font-size: 0.75rem;
  }
}

@media screen and (max-width: 720px) {
  .cbe-reset-btn {
    font-size: 0.55rem;
    line-height: 1rem;
    margin: 0.2rem;
  }
}
</style>
