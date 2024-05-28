<template>
  <section class="content__container">
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
      <PageHeader
        class="page-header__container"
        :title="'Guests: ' + guests.length"
      />
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
      <PageHeader
        class="page-header__container"
        :title="'Students: ' + filteredStudents.length"
      />
      <form class="search-wrapper">
        <input
          type="search"
          name="search-students"
          id="search-students"
          v-model="searchQuery"
          placeholder=" "
        />
        <label for="search-students"> Type a name to search students </label>
      </form>
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
      <div class="bulk-edit__wrapper">
        <button class="btn btn-accent" @click="startBulkEdit" v-if="!bulkEdit">
          Bulk Edit
        </button>
        <button class="btn" @click="stopBulkEdit" v-if="bulkEdit">
          Cancel Bulk Edit
        </button>
        <button
          class="btn btn-accent"
          @click.prevent="updateMultipleUsers"
          v-if="isMultipleEditsMode"
        >
          Update All
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th scope="col" class="col-name">Name</th>
            <th scope="col">Class</th>
            <th scope="col">Role</th>
            <th scope="col">GitHub</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents" :key="student.data.uid">
            <th scope="row">
              <span v-if="!student.editMode">
                {{ student.data.githubName }}
              </span>
              <span v-else>
                <input
                  type="text"
                  :name="'name' + student.data.uid"
                  :id="'name' + student.data.uid"
                  v-model="student.data.githubName"
                />
              </span>
            </th>
            <td>
              {{ getClassName(student.data) }}
            </td>
            <td class="col-role">
              <span v-if="!student.editMode">
                {{ student.data.role }}
              </span>
              <select name="role" id="role" v-else v-model="student.data.role">
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="guest">Guest</option>
                <option value="teacher">Teacher</option>
              </select>
            </td>
            <td>
              <a
                :href="student.data.githubProfileUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="student__github-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="icon icon-github"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                  />
                </svg>
                {{ getShortLink(student.data.githubProfileUrl) }}</a
              >
            </td>
            <td class="col-edit">
              <svg
                @click="student.editMode = !student.editMode"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="icon icon-edit"
                v-if="!student.editMode"
                viewBox="0 0 16 16"
              >
                <path
                  d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"
                />
              </svg>
              <span v-else> </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
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

  components: {
    PageHeader,
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
      bulkEdit: false,
    };
  },
  methods: {
    startBulkEdit() {
      this.bulkEdit = true;

      this.filteredStudents.forEach(function (student) {
        student.editMode = true;
      });
    },

    stopBulkEdit() {
      this.bulkEdit = false;

      this.filteredStudents.forEach(function (student) {
        student.editMode = false;
      });
    },

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
    isMultipleEditsMode() {
      return this.editedStudents.length > 1;
    },
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
.content__container {
  container-type: inline-size;
  container-name: content;
}

.view-form__wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-header__container {
  margin-block: var(--s-base);
}

.missing-meta-form {
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-gap: 0.5rem;
}

.search-wrapper {
  --p-inline: 0.5rem;
  --border-size: 2px;

  margin-bottom: var(--s-large);

  position: relative;
}

.search-wrapper > label {
  color: var(--clr-accent);
  cursor: text;
  position: absolute;
  top: 50%;
  left: calc(var(--p-inline) + var(--border-size));

  transform: translateY(-50%);

  transition: transform 200ms, top 200ms, font-size 200ms;
}

#search-students {
  font-size: 100%;
  font-family: inherit;

  width: 100%;
  border: var(--border-size) solid var(--clr-accent);
  border-radius: var(--radius-outer);
  padding-block: 1.25rem 0.75rem;
  padding-inline: var(--p-inline);
}

#search-students:focus + label,
#search-students:not(:placeholder-shown) + label {
  font-size: 75%;
  top: 0.75rem;
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
  margin-block: 1rem;
  border-radius: var(--radius-inner);
}

.time-models__wrapper {
  margin-block: 1rem;

  display: flex;
  gap: 1rem;
}

.bulk-edit__wrapper {
  display: flex;
  gap: var(--s-base);
}

.length {
  margin-block: var(--s-base);
}

.col-name {
  width: 30%;
}

.col-role {
  text-transform: capitalize;
}

.col-edit {
  text-align: center;
}

input[type="text"] {
  all: unset;

  width: 100%;
  border-bottom: 1px solid var(--clr-accent);
  margin-bottom: -1px;
}

input[type="text"]:focus {
  border-color: var(--clr-white);
}

.student__github-link {
  --padding: var(--s-xs);

  color: var(--clr-white);
  background-color: var(--clr-accent);
  text-decoration: none;

  padding: var(--padding) calc(var(--padding));
  border-radius: var(--radius-inner);
}

.icon {
  width: var(--s-base);
}

.icon-edit {
  color: var(--clr-accent);
  cursor: pointer;
}

.students-list {
  --columns: 1;

  padding: 0;
  margin-block: var(--s-base);

  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--s-large);
}

.student-list__item {
  background-color: var(--clr-white);
  color: var(--clr-text);

  list-style-type: none;

  padding: var(--s-large) var(--s-base);
  border: 1px solid var(--clr-accent);
  border-radius: var(--radius-outer);

  position: relative;

  overflow: hidden;
}

.edit-icon {
  color: white;
  background-color: var(--clr-accent);

  width: var(--s-base);
  padding: var(--s-small);
  border-radius: 0 0 0 var(--radius-inner);

  position: absolute;
  top: 0;
  right: 0;
}

.edit-icon.active {
  background-color: var(--clr-white);
  color: var(--clr-accent);
}

.edit-name {
  all: unset;

  color: var(--clr-accent);
  font-size: 125%;
  font-weight: 600;
  font-family: inherit;

  border-bottom: 1px solid var(--clr-accent);
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

.role-tab {
  background-color: inherit;
  text-transform: capitalize;
  color: var(--clr-text-lighter);
  font-size: 75%;

  border: 1px solid var(--clr-accent);
  border-radius: var(--radius-inner);
  padding: 0.25rem 0.75rem;
}

.role__wrapper input[type="radio"]:checked + .role-tab,
.selected-role-tab {
  background-color: var(--clr-accent-light);
  color: var(--clr-accent);
}

.selected-role-tab {
  margin-block: var(--s-base);
  display: block;
  width: fit-content;
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

@container content (min-width: 768px) {
  #search-students {
    border-radius: var(--radius-inner);
  }

  .students-list {
    --columns: 2;
  }

  .student-list__item {
    border-radius: var(--radius-inner);
  }

  .role-tab {
    font-size: 100%;
  }
}

@media screen and (min-width: 768px) {
  .view-form__wrapper {
    background-color: var(--clr-accent);

    padding: var(--inner-padding) calc(var(--inner-padding) * 1.5);
    margin: calc(var(--inner-padding) * -1.5) calc(var(--inner-padding) * -1.5)
      0 calc(var(--inner-padding) * -1.5);
    border-radius: var(--radius-outer) var(--radius-outer) 0 0;

    gap: var(--s-large);
  }

  .view-form__wrapper > .tab-text {
    color: white;
    font-size: 115%;
  }

  .view-form__wrapper > .tab:checked + .tab-text {
    text-decoration-color: white;
  }

  .page-header__container {
    margin-block: var(--s-large);
  }
}
</style>
