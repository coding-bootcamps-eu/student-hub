<template>
  <section>
    <p>lpKey: {{ lpKey }}</p>
    <p>studentName: {{ this.localLP.studentName }}</p>
    <p>studentID: {{ localLP.studentID }}</p>
    <p>teacherID: {{ teacherID }}</p>
  </section>
  <LPTeacherForm
    :studentName="localLP.studentName"
    :teacherID="teacherID"
    :studentID="localLP.studentID"
    :lpKey="lpKey"
  />
</template>

<script>
import firestore from "@/firestore";
import { doc, getDoc } from "firebase/firestore";

import LPTeacherForm from "@/components/LPLearnProgress/LPTeacherForm.vue";
export default {
  name: "LPEntryDetails",
  components: {
    LPTeacherForm,
  },
  data() {
    return {
      lpKey: this.$route.params.lpKey,
      localLP: {},
    };
  },
  computed: {
    teacherID() {
      return this.$store.getters.getCurrentUserID;
    },
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
  },
};
</script>
