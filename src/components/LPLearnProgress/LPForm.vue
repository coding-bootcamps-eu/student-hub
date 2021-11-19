<template>
  <section>
    <form>
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
          @lp-value="this.currentLP.htmlLP = $event"
          :modelValue="currentLP.htmlLP"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in CSS?"
          @lp-value="this.currentLP.cssLP = $event"
          :modelValue="currentLP.cssLP"
        />
        <LPFormFieldWithBar
          lpLegend="Wie fit und wohl fühlst du dich in JavaScript?"
          @lp-value="this.currentLP.jsLP = $event"
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
        htmlpLPComment: 0,
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
  // computed: {
  //   submitButton() {
  //     return console.log(this.currentLP);
  //   },
  // },
};
</script>

<style></style>
