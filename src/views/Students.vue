<template>
  <section>
    <form
      class="view-form__wrapper"
      @change="showStudents = $event.target.value === 'students'"
    >
      <input
        type="radio"
        name="students"
        id="show-students"
        value="students"
        :checked="showStudents"
        class="tab"
      />
      <label for="show-students" class="tab-text">Students</label>
      <input
        type="radio"
        name="students"
        id="show-guests"
        value="guests"
        class="tab"
      />
      <label for="show-guests" class="tab-text">Guests</label>
    </form>
    <section
      class="students-wrong-meta-data"
      v-if="this.$store.getters.isTeacher && showStudents === false"
    >
      <h3>Guests ({{ guests.length }})</h3>
      <ul class="students-list">
        <li
          v-for="user in guests"
          :key="user.data.uid"
          class="student-list__item"
        >
          <span>{{ user.data.githubName }}</span>
          <a
            :href="user.data.githubProfileUrl"
            target="_blank"
            rel="noopener noreferrer"
            >{{ user.data.githubProfileUrl }}</a
          >
          <div class="missing-meta-form">
            <label for="">Classname</label
            ><input type="text" v-model="user.data.className" />
            <label for="">Fulltime</label
            ><input type="checkbox" v-model="user.data.fulltime" />
            <label for="">Role</label>

            <select name="" id="" v-model="user.data.role">
              <option value="">----</option>
              <option value="guest">Guest</option>
              <option value="alumni">Alumni</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            <button @click="updateUser(user)">Update</button>
            <button @click="deleteUser(user)">Delete</button>
          </div>
        </li>
      </ul>
    </section>
    <section class="students" v-if="showStudents">
      <input
        type="search"
        name="search-students"
        id="search-students"
        v-model="searchQuery"
      />
      <form class="students-filter">
        <div>
          <label for="class-name" style="position: absolute; font-size: 0"
            >Show students from class</label
          ><select name="class-name" id="class-name" v-model="classNameFilter">
            <option value="all">All Classes</option>
            <option
              :value="className"
              v-for="className of classNames"
              :key="className"
            >
              {{ className }}
            </option>
          </select>
        </div>
        <div class="time-models__wrapper">
          <input
            type="radio"
            id="time-model-all"
            value="all"
            v-model="timeModelFilter"
            class="tab"
          />
          <label for="time-model-all" class="tab-text">All time models</label>
          <input
            type="radio"
            id="time-model-fulltime"
            value="fulltime"
            v-model="timeModelFilter"
            class="tab"
          />
          <label for="time-model-fulltime" class="tab-text">Full time</label>
          <input
            type="radio"
            id="time-model-parttime"
            value="parttime"
            v-model="timeModelFilter"
            class="tab"
          />
          <label for="time-model-parttime" class="tab-text">Part time</label>
        </div>
      </form>
      <p>There are {{ filteredStudents.length }} students 🎉</p>
      <ul class="students-list">
        <li
          v-for="student in filteredStudents"
          :key="student.data.uid"
          class="student-list__item"
        >
          <form
            v-if="this.$store.getters.isTeacher"
            @input="editStudent(student)"
          >
            <div class="name">
              <input
                type="checkbox"
                name="toggle-edit"
                :id="'toggle-edit' + student.data.uid"
                v-model="student.editMode"
              />
              <label :for="'toggle-edit' + student.data.uid">
                <span style="position: absolute; font-size: 0">
                  Edit Name
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </label>
              <span v-if="!student.editMode" class="student__name">{{
                student.data.githubName
              }}</span>
              <input
                type="text"
                name="student-name"
                :id="'student-name' + student.uid"
                v-model="student.data.githubName"
                v-show="student.editMode"
              />
            </div>
            <div class="role__wrapper">
              <div class="role__item" v-for="role of roles" :key="role">
                <input
                  type="radio"
                  :name="'role' + student.data.uid"
                  :id="role + student.data.uid"
                  :checked="role === student.data.role"
                  @change="changeRole(student, role)"
                />
                <label :for="role + student.data.uid" class="role-tab">{{
                  role
                }}</label>
              </div>
            </div>
            <button
              :disabled="student.isEdited !== true"
              @click.prevent="updateUser(student)"
              class="btn-update"
            >
              Update User
            </button>
          </form>
          <div class="student__info">
            <a
              :href="student.data.githubProfileUrl"
              target="_blank"
              rel="noopener noreferrer"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                />
              </svg>
              {{ getShortLink(student.data.githubProfileUrl) }}</a
            >
            <span class="class">{{ getClassName(student.data) }}</span>
          </div>
        </li>
      </ul>
    </section>
    <button
      class="btn-update btn-update-all"
      @click.prevent="updateMultipleUsers"
      v-if="editedStudents.length > 1"
    >
      Update All
    </button>
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
      guests: [],
      roles: ["student", "alumni", "guest", "teacher"],
      searchQuery: "",
      showStudents: true,
      editedStudents: [],
    };
  },
  methods: {
    editStudent(student) {
      student.isEdited = true;

      const index = this.editedStudents.findIndex(function (existingStudent) {
        return existingStudent.data.uid === student.data.uid;
      });

      if (index > -1) {
        this.editedStudents.splice(index, 1, student);
      } else {
        this.editedStudents.push(student);
      }
    },
    changeRole(student, newRole) {
      student.data.role = newRole;
    },
    getClassName(student) {
      if (student.isFullTime) {
        return "VZ-" + student.className;
      } else {
        return "TZ-" + student.className;
      }
    },

    getShortLink(link) {
      return link.replace("https://github.com/", "");
    },
    async updateUser(userObj) {
      const { data, doc } = userObj;
      await updateDoc(doc.ref, data);

      const index = this.editedStudents.findIndex(function (existingStudent) {
        return existingStudent.data.uid === data.uid;
      });

      if (index > -1) {
        this.editedStudents.splice(index, 1);
      }

      userObj.editMode = false;
      userObj.isEdited = false;
    },

    updateMultipleUsers() {
      for (let i = this.editedStudents.length - 1; i >= 0; i--) {
        this.updateUser(this.editedStudents[i]);
      }
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
          this.guests.push({
            data: studentData,
            doc: studentDoc,
          });
        } else {
          this.students.push({
            data: studentData,
            doc: studentDoc,
          });
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
        this.timeModelFilter === defaultTimeModelFilter &&
        this.searchQuery === ""
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

          if (s.data.githubName) {
            return (
              classFilterPassed &&
              timeModelFilterPassed &&
              (s.data.githubName
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) ||
                s.data.githubScreenName
                  .toLowerCase()
                  .includes(this.searchQuery.toLowerCase()))
            );
          } else {
            return (
              classFilterPassed &&
              timeModelFilterPassed &&
              s.data.githubScreenName
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            );
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.view-form__wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.missing-meta-form {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 0.5rem;
}

.students-wrong-meta-data {
  margin-bottom: 4rem;
}

#search-students {
  font-size: 100%;

  width: 100%;
  border: 2px solid var(--clr-accent);
  border-radius: 3rem;
  padding: 0.5rem 1.5rem;
  margin-block: 2rem;
}

#class-name {
  background-color: transparent;
  color: var(--clr-accent);

  padding: 0.25rem 0.75rem;
  border: none;
  border-bottom: 2px solid var(--clr-accent);
}

.students-filter {
  background-color: var(--clr-accent-light);

  padding: 1rem;
}

.time-models__wrapper {
  margin-block: 1rem;

  display: flex;
  gap: 1rem;
}

.students-list {
  padding: 0;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.student-list__item {
  background-color: var(--clr-white);
  color: var(--clr-text);

  list-style-type: none;

  padding: 2rem;
  border: 1px solid var(--clr-accent);
  border-radius: var(--radius-outer);
}

.name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.student__name {
  color: var(--clr-accent);
  font-weight: 600;
  font-size: 125%;
}

.name input[type="checkbox"] {
  all: unset;
  position: absolute;
}

.role__wrapper {
  margin-block: 1rem;

  display: flex;
  gap: 0.5rem;
}

.role__wrapper input[type="radio"] {
  all: unset;
  position: absolute;
}

.role__wrapper .role-tab {
  background-color: inherit;
  text-transform: capitalize;

  border: 1px solid var(--clr-accent);
  border-radius: var(--radius-inner);
  padding: 0.25rem 0.75rem;
}

.role__wrapper input[type="radio"]:checked + .role-tab {
  background-color: var(--clr-accent-dark);
  color: var(--clr-accent-light);
}

.btn-update {
  background-color: var(--clr-accent);
  color: var(--clr-white);
  font-size: 100%;

  border: none;
  border-radius: var(--radius-inner);
  padding: 0.25rem 0.75rem;
}

.btn-update[disabled] {
  opacity: 0.5;
  color: grey;
}

.student__info {
  margin-block: 2rem 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.student__info > a {
  color: inherit;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.25rem;
  text-decoration-color: var(--clr-accent);

  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.student__info .class {
  border: 1px solid var(--clr-accent);
  padding: 0.125rem 0.375rem;
  border-radius: 2rem;
}

.btn-update-all {
  background: var(--clr-accent-light);
  color: var(--clr-accent);

  border: 2px solid var(--clr-accent);
  border-radius: 2rem;

  position: fixed;
  right: 1rem;
  bottom: 1rem;
}

@media screen and (max-width: 768px) {
  .students-list {
    grid-template-columns: 1fr;
  }
}
</style>
