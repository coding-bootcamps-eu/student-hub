<template>
  <section>
    <form @input="updateLP">
      <div>
        <!--LP-Value = emit aus child component
         getValue Parent method
         -->
        <LPFormFieldWithBar
          lpLegend="Bewerte deinen allgemeinen Lernfortschritt"
          @lp-value="this.currentLP.basicLPComment = $event"
          @slider-value="currentLP.basicLP = $event"
          ref="basicLearningInput"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in HTML?"
          @lp-value="this.currentLP.htmlLPComment = $event"
          @slider-value="currentLP.htmlLP = $event"
          ref="htmlLearningInput"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in CSS?"
          @lp-value="this.currentLP.cssLPComment = $event"
          @slider-value="currentLP.cssLP = $event"
          ref="cssLearningInput"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in JavaScript?"
          @lp-value="this.currentLP.jsLPComment = $event"
          @slider-value="currentLP.jsLP = $event"
          ref="jsLearningInput"
        />
        <LPFormFieldWithoutBar
          lpLegend="Was lief deiner Meinung nach gut für dich?"
          lp__placeholder="Beschreibe was deiner Meinung nach gut für dich lief..."
          @lp-value-without-bar="this.currentLP.goodInCourse = $event"
          ref="goodInCouseInput"
        />
        <LPFormFieldWithoutBar
          lpLegend="Was würdest du gerne besser machen?"
          lp__placeholder="Beschreibe was du gerne besser machen würdest..."
          @lp-value-without-bar="this.currentLP.improvements = $event"
          ref="improvementsInput"
        />
        <LPFormFieldWithoutBar
          lpLegend="Was läuft gut im Kurs?"
          lp__placeholder="Beschreibe was du am Kurs gut findest..."
          @lp-value-without-bar="this.currentLP.whatWasGood = $event"
          ref="whatWasGoodInput"
        />
        <LPFormFieldWithoutBar
          lpLegend="Was würdest du gerne verbessert sehen?"
          lp__placeholder="Beschreibe was du am Kurs verbessern würdest..."
          @lp-value-without-bar="this.currentLP.whatCouldBeBetter = $event"
          ref="whatCouldBeBetterInput"
        />
      </div>
      <div class="button-wrapper">
        <input type="reset" value="Reset" class="cbe-reset-btn" />
        <cbe-main-btn buttonClass="primary" @click="createLP"
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
import { collection, addDoc } from "firebase/firestore";

export default {
  name: "LPForm",

  data() {
    return {
      lpValue: "",
      testInput: "",
      currentLP: {
        studentName: this.$store.getters.getCurrentUserScreenname,
        studentID: this.$store.getters.getCurrentUserID,
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
      this.$store.commit("setCurrentLP", {
        currentLP: this.currentLP,
      });
    },
    async createLP(e) {
      this.currentLP.studentName = this.$store.getters.getCurrentUserScreenname;
      this.currentLP.studentID = this.$store.getters.getCurrentUserID;
      e.preventDefault();
      const docRef = await addDoc(
        collection(firestore, "learn-progress"),
        this.currentLP
      );
      console.log(docRef.id);

      console.log(this.currentLP.basicLPComment);
      console.log(this.currentLP.htmlLPComment);
      console.log(this.currentLP.cssLPComment);
      console.log(this.currentLP.jsLPComment);

      this.resetInput();
    },
    resetInput() {
      this.$refs.basicLearningInput.resetInput();
      this.$refs.htmlLearningInput.resetInput();
      this.$refs.cssLearningInput.resetInput();
      this.$refs.jsLearningInput.resetInput();
      this.$refs.goodInCouseInput.resetInput();
      this.$refs.improvementsInput.resetInput();
      this.$refs.whatWasGoodInput.resetInput();
      this.$refs.whatCouldBeBetterInput.resetInput();
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
