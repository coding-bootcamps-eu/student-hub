<template>
  <section>
    <header class="page-heading">
      <h2 class="page-heading__title">Students</h2>
      <p class="page-heading__subtitle">Your fellow students</p>
    </header>
    <section
      class="students-wrong-meta-data"
      v-if="this.$store.getters.isTeacher"
    >
      <h3>Missing Permissions and Meta Data</h3>
      <ul class="students-list">
        <li
          v-for="student in studentsWrongMetaData"
          :key="student.data.uid"
          class="student-list__item"
        >
          <img :src="student.data.githubProfileUrl + '.png'" alt="" />
          <span>{{ student.data.githubName }}</span>
          <a
            :href="student.data.githubProfileUrl"
            target="_blank"
            rel="noopener noreferrer"
            >{{ student.data.githubProfileUrl }}</a
          >
          <div class="missing-meta-form">
            <label for="">Classname</label
            ><input type="text" v-model="student.data.className" />
            <label for="">Fulltime</label
            ><input type="checkbox" v-model="student.data.fulltime" />
            <label for="">Role</label>

            <select name="" id="" v-model="student.data.role">
              <option value="">----</option>
              <option value="guest">Guest</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            <pre>{{ student.data }}</pre>
            <button @click="updateUser(student)">Update</button>
          </div>
        </li>
      </ul>
    </section>
    <section class="students">
      <ul class="students-list">
        <li
          v-for="student in students"
          :key="student.uid"
          class="student-list__item"
        >
          <img :src="student.githubProfileUrl + '.png'" alt="" />
          <span>{{ student.githubName }}</span>
          <a
            :href="student.githubProfileUrl"
            target="_blank"
            rel="noopener noreferrer"
            >{{ student.githubProfileUrl }}</a
          >
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import {
  query,
  where,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default {
  name: "Students",
  created() {
    this.loadStudents();
  },
  data() {
    return {
      students: [],
      studentsWrongMetaData: [],
    };
  },
  methods: {
    async updateUser(userObj) {
      const { data, doc } = userObj;
      await updateDoc(doc.ref, data);
    },

    // TODO: move to store?
    async loadStudents() {
      const isStudent = this.$store.getters.isStudent;
      const isTeacher = this.$store.getters.isTeacher;
      this.students.length = 0;

      let studentDocs = [];
      if (isTeacher) {
        studentDocs = await getDocs(collection(db, "all-users"));
      } else if (isStudent) {
        studentDocs = await getDocs(
          query(collection(db, "all-users"), where("role", "==", "student"))
        );
      }

      studentDocs.forEach((studentDoc) => {
        const studentData = studentDoc.data();

        if (
          studentData.role === "guest" ||
          studentData.fulltime === undefined ||
          studentData.className === undefined
        ) {
          this.studentsWrongMetaData.push({
            data: studentData,
            doc: studentDoc,
          });
        } else {
          this.students.push(studentData);
        }
      });
    },
  },
  watch: {},
  computed: {},
};
</script>

<style>
.missing-meta-form {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 0.5rem;
}

.missing-meta-form > pre,
.missing-meta-form > button {
  grid-column-start: 1;
  grid-column-end: 3;
}

.students-wrong-meta-data {
  border-bottom: 2px dashed red;
  margin-bottom: 4rem;
}

.students-list {
  padding: 0;
}

.students-list > * + * {
  margin-top: 1rem;
}

.student-list__item {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  grid-template-areas:
    "img name"
    "img githublink";
  grid-column-gap: 1rem;
  padding: 0.5rem;
  background-color: #e5e5e5;
  border: 1px solid #c4c4c4;
}

.student-list__item > img {
  width: 3rem;
  border-radius: 0.2rem;
  grid-area: img;
}

.student-list__item > span {
  font-weight: 600;
  grid-area: name;
}

.student-list__item > a {
  grid-area: githublink;
  color: black;
  text-decoration: underline;
}
</style>
