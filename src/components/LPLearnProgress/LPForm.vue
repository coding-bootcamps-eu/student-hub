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
          :modelValue="currentLP.basicLPComment"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in HTML?"
          @lp-value="this.currentLP.htmlLPComment = $event"
          :modelValue="currentLP.htmlLP"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in CSS?"
          @lp-value="this.currentLP.cssLPComment = $event"
          :modelValue="currentLP.cssLP"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in JavaScript?"
          @lp-value="this.currentLP.jsLPComment = $event"
          :modelValue="currentLP.jsLP"
        />
        <LPFormFieldWithoutBar
          lpLegend="Was lief deiner Meinung nach gut für dich?"
          lp__placeholder="Beschreibe was deiner Meinung nach gut für dich lief..."
          @lp-value-without-bar="this.currentLP.goodInCourse = $event"
          :modelValue="currentLP.goodInCourse"
        />
        <LPFormFieldWithoutBar
          lpLegend="Was würdest du gerne besser machen?"
          lp__placeholder="Beschreibe was du gerne besser machen würdest..."
          @lp-value-without-bar="this.currentLP.improvements = $event"
          :modelValue="currentLP.improvements"
        />
        <LPFormFieldWithoutBar
          lpLegend="Was läuft gut im Kurs?"
          lp__placeholder="Beschreibe was du am Kurs gut findest..."
          @lp-value-without-bar="this.currentLP.whatWasGood = $event"
          :modelValue="currentLP.whatWasGood"
        />
        <LPFormFieldWithoutBar
          lpLegend="Was würdest du gerne verbessert sehen?"
          lp__placeholder="Beschreibe was du am Kurs verbessern würdest..."
          @lp-value-without-bar="this.currentLP.whatCouldBeBetter = $event"
          :modelValue="currentLP.whatCouldBeBetter"
        />
      </div>
      <div>
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
      currentLP: {
        author: "",
        userID: "",
        basicLP: 0,
        basicLPComment: "",
        cssLP: "",
        cssLPComment: 0,
        htmlLP: "",
        htmlLPComment: 0,
        jsLP: "",
        jsLPComment: 0,
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
    async createLP() {
      this.currentLP.author = this.$store.getters.getCurrentUserScreenname;
      this.currentLP.userID = this.$store.getters.getCurrentUserID;
      this.$store.commit("setCurrentLP", {
        currentLP: this.currentLP,
      });
      const docRef = await addDoc(
        collection(firestore, "learn-progress"),
        this.$store.getters.getCurrentLP
      );
      console.log(docRef.id);
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
