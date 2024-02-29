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
      <h3>
        Missing Permissions and Meta Data ({{ studentsWrongMetaData.length }})
      </h3>
      <label for="hide-wrong-meta">Show</label
      ><input
        id="hide-wrong-meta"
        type="checkbox"
        v-model="showStudentsWithWrongMetaData"
      />
      <ul class="students-list" v-if="showStudentsWithWrongMetaData">
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
            <button @click="deleteUser(student)">Delete</button>
          </div>
        </li>
      </ul>
    </section>
    <section class="students">
      <form class="students-filter">
        <div>
          <label for="class-name">Show students from class</label>&nbsp;<select
            name=""
            id="class-name"
            v-model="classNameFilter"
          >
            <option value="all">All</option>
            <option
              :value="className"
              v-for="className of classNames"
              :key="className"
            >
              {{ className }}
            </option>
          </select>
        </div>
        <div>
          <input
            type="radio"
            id="time-model-all"
            value="all"
            v-model="timeModelFilter"
          />
          <label for="time-model-all">All time models</label>
          <input
            type="radio"
            id="time-model-fulltime"
            value="fulltime"
            v-model="timeModelFilter"
          />
          <label for="time-model-fulltime">Full time</label>
          <input
            type="radio"
            id="time-model-parttime"
            value="parttime"
            v-model="timeModelFilter"
          />
          <label for="time-model-parttime">Part time</label>
        </div>
      </form>
      <p>There are {{ filteredStudents.length }} students 🎉</p>
      <ul class="students-list">
        <li
          v-for="student in filteredStudents"
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
          <form v-if="this.$store.getters.isTeacher">
            <select
              :name="student.data.uid + 'role'"
              :id="student.data.uid"
              v-model="student.data.role"
            >
              <option v-for="role of roles" :value="role" :key="role">
                {{ role }}
              </option>
            </select>
            <button @click.prevent="updateUser(student)">Update User</button>
          </form>
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
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const defaultClassNameFilter = "all";
const defaultTimeModelFilter = "all";

export default {
  name: "Students",
  created() {
    this.loadStudents();
  },
  data() {
    return {
      timeModelFilter: defaultTimeModelFilter,
      classNameFilter: defaultClassNameFilter,
      students: [],
      studentsWrongMetaData: [],
      showStudentsWithWrongMetaData: false,
      roles: ["guest", "student", "teacher"],
    };
  },
  methods: {
    async updateUser(userObj) {
      const { data, doc } = userObj;
      console.log(userObj);
      await updateDoc(doc.ref, data);
    },

    async deleteUser(userObj) {
      const doc = userObj.doc;
      await deleteDoc(doc.ref);
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
          (studentData.role === "student" &&
            studentData.fulltime === true &&
            (studentData.fulltime === undefined ||
              studentData.className === undefined))
        ) {
          this.studentsWrongMetaData.push({
            data: studentData,
            doc: studentDoc,
          });
        } else {
          this.students.push({
            data: studentData,
            doc: studentDoc,
          });
          console.log(studentData);
        }
      });
    },
  },
  watch: {},
  computed: {
    classNames() {
      const classNames = this.students
        .map((s) => s.data.className)
        .filter((c) => c && c.length > 0);

      classNames.sort();

      return new Set(classNames);
    },
    filteredStudents() {
      if (
        this.classNameFilter === defaultClassNameFilter &&
        this.timeModelFilter === defaultTimeModelFilter
      ) {
        return this.students;
      } else {
        return this.students.filter((s) => {
          let classFilterPassed = true;
          let timeModelFilterPassed = true;

          classFilterPassed =
            this.classNameFilter === defaultClassNameFilter ||
            s.data.className === this.classNameFilter;

          if (this.timeModelFilter !== defaultTimeModelFilter) {
            const requiredTimeModelState = this.timeModelFilter === "fulltime";
            timeModelFilterPassed = s.data.fulltime === requiredTimeModelState;
          }

          return classFilterPassed && timeModelFilterPassed;
        });
      }
    },
  },
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
  margin-bottom: 4rem;
}

.students-filter > * + * {
  margin-top: 1rem;
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
