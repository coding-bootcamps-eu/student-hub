<template>
  <section>
    <p>lpKey: {{ lpKey }}</p>
    <p>studentName: {{ this.localLP.studentName }}</p>
    <p>studentID: {{ localLP.studentID }}</p>
  </section>
</template>

<script>
import firestore from "@/firestore";
import { doc, getDoc } from "firebase/firestore";
export default {
  name: "LPEntryDetails",
  data() {
    return {
      lpKey: this.$route.params.lpKey,
      localLP: {},
    };
  },
  methods: {
    async getLP() {
      const lpRef = doc(firestore, "learn-progress", this.lpKey);
      const lpSnap = await getDoc(lpRef);
      if (lpSnap.exists()) {
        this.localLP = lpSnap.data();
      } else {
        console.log("No such document!");
      }
    },
  },
  async created() {
    await this.getLP();
    console.log(this.localLP);
  },
};
</script>
