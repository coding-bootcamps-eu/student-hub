<template>
  <cbe-main-btn buttonClass="primary" @click="createLPAnswer"
    >CreateLPAnswer</cbe-main-btn
  >
</template>

<script>
import firestore from "@/firestore";
import { collection, addDoc } from "firebase/firestore";
export default {
  name: "AddLPAnswer",
  data() {
    return {
      currentLP: {
        teacherID: "wz7AYRXswoSAFvyPNQ9wLQ866I82",
        studentID: "ovoC8dWOkQfYOxkJdp8mAUCUbzL2",
        lpKey: "9HF3dTR1ldZbNo6lD6bE",
        basicLP: 3,
        cssLP: 3,
        htmlLP: 3,
        jsLP: 5,
        goodInCourse: "Alles tutti in Frutti",
        improvements: "Nothing",
        whatCouldBeBetter: "Nothing",
        whatWasGood: "Everything",
        answerNeeded: false,
      },
    };
  },
  methods: {
    async createLPAnswer() {
      await addDoc(collection(firestore, "lp-answer"), this.currentLP);
      await this.$store.dispatch("updateLP", {
        key: "blabla",
      });
    },
  },
};
</script>
