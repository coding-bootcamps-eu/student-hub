<template>
  <cbe-main-btn buttonClass="primary" @click="createLP">CreateLP</cbe-main-btn>
</template>

<script>
import firestore from "@/firestore";
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
export default {
  name: "AddLP",
  data() {
    return {
      currentLP: {
        author: "ChristianMLux",
        userID: "ovoC8dWOkQfYOxkJdp8mAUCUbzL2",
        basicLP: 2,
        cssLP: 5,
        htmlLP: 3,
        jsLP: 5,
        goodInCourse: "Alles tutti in Frutti",
        improvements: "Nothing",
        whatCouldBeBetter: "Nothing",
        whatWasGood: "Everything",
        answerNeeded: true,
      },
    };
  },
  methods: {
    async addLPToStudent(currentLP) {
      const studentRef = doc(
        firestore,
        "all-users",
        this.$store.getters.getCurrentUserID
      );
      await updateDoc(studentRef, {
        studentLPs: arrayUnion(currentLP),
      });
    },
    async createLP() {
      this.$store.commit("setCurrentLP", {
        currentLP: this.currentLP,
      });
      await addDoc(
        collection(firestore, "learn-progress"),
        this.$store.getters.getCurrentLP
      );
      this.addLPToStudent(this.$store.getters.getCurrentLP);
    },
  },
};
</script>
