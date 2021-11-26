<template>
  <cbe-main-btn buttonClass="primary" @click="createLP">CreateLP</cbe-main-btn>
</template>

<script>
import firestore from "@/firestore";
import { collection, addDoc } from "firebase/firestore";
export default {
  name: "AddLP",
  data() {
    return {
      currentLP: {
        author: "ChristianMLux",
        userID: "ovoC8dWOkQfYOxkJdp8mAUCUbzL2",
        basicLP: 4,
        cssLP: 4,
        htmlLP: 4,
        jsLP: 4,
        goodInCourse: "Alles tutti in Frutti",
        improvements: "Nothing",
        whatCouldBeBetter: "Nothing",
        whatWasGood: "Everything",
        answerNeeded: true,
      },
    };
  },
  methods: {
    async createLP() {
      this.$store.commit("setCurrentLP", {
        currentLP: this.currentLP,
      });
      await addDoc(
        collection(firestore, "learn-progress"),
        this.$store.getters.getCurrentLP
      );
    },
  },
};
</script>
