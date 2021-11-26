<template>
  <li class="outer-li">
    <ul class="th__list-wrapper">
      <li class="th__student-name">
        <a :href="gitURL" class="th__student-name"
          >{{ gitDisplayName }}<i class="fa fa-github"></i
        ></a>
      </li>
      <li class="issues text">
        <p class="th__student-open-issues">
          Issues:
          {{ userIssues }}
        </p>
      </li>
      <li class="repos text">
        <p class="th__student-repo-counter">Repos: {{ userRepos }}</p>
      </li>
      <li class="details">
        <router-link
          :to="{
            name: 'studentDetails',
            params: {
              studentKey,
              email,
              gitDisplayName,
              gitScreenName,
              gitToken,
              gitURL,
              userScheduleURL,
              id,
              studentRotis: JSON.stringify(studentRotis),
              userIssues,
              userRepos,
            },
          }"
        >
          Details</router-link
        >
      </li>
      <li class="lps">
        <ul v-if="studentLPArray" class="lpList">
          <li
            v-for="lp in studentLPArray"
            :key="lp.lpKey"
            :lpKey="lp.lpKey"
            v-bind="lp"
          >
            <router-link
              :to="{ name: 'lpDetail', params: { lpKey: lp.lpKey } }"
            >
              LP
            </router-link>
          </li>
        </ul>
      </li>
      <li class="schedule">
        <a :href="userScheduleURL" target="_blank">CBE-Schedule</a>
      </li>
    </ul>
  </li>
</template>

<script>
import firestore from "@/firestore";

import { collection, getDocs, query, where } from "firebase/firestore";
export default {
  name: "StudentListElement",
  data() {
    return {
      studentLPArray: [],
    };
  },
  methods: {
    async createStudentLPArray() {
      const q = query(
        collection(firestore, "learn-progress"),
        where("studentID", "==", this.studentKey)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().answerNeeded === true) {
          this.studentLPArray.push({
            lpKey: doc.id,
            lpData: doc.data(),
          });
        }
      });
      console.log("DOM Array", this.studentLPArray);
    },
  },
  props: {
    email: {
      type: String,
    },
    gitDisplayName: {
      type: String,
    },
    gitScreenName: {
      type: String,
    },
    gitToken: {
      type: String,
    },
    id: {
      type: [String, Number],
    },
    studentRotis: {
      type: Array,
    },
    userIssues: {
      type: [String, Number],
    },
    userRepos: {
      type: [String, Number],
    },
    gitURL: {
      type: String,
    },
    userScheduleURL: {
      type: String,
    },
    studentKey: {
      required: true,
    },
  },
  async created() {
    await this.createStudentLPArray();
  },
};
</script>
<style lang="scss" scoped>
a {
  all: unset;
  color: var(--primary-color);
  font-weight: 500;
  max-width: 100%;
  cursor: pointer;
  &:hover {
    color: var(--success-color);
  }
}
.th__list-wrapper {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  align-items: center;
  gap: 0.5rem;
}
.th__list-wrapper > * {
  width: 100%;
  height: 100%;
}
.th__student-name {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}
.issues {
  grid-row: 1 / 2;
}
.repos {
  grid-row: 2 / 3;
}
.lps {
  grid-row: 1 / 3;
}
.details {
  grid-row: 1 / 2;
  grid-column: 5 / 6;
}
.schedule {
  grid-row: 2 / 3;
}

.th__list-wrapper > li > * {
  padding: 0;
  margin: 0;
}

.lpList {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.schedule,
.details {
  text-align: left;
  font-size: 0.85em;
}
i {
  font-size: 1.3rem;
  color: var(--primary-color);
  &:hover {
    color: var(--secondary-color);
  }
}
.lps {
  a {
    color: var(--fail-color);
    &:hover {
      color: var(--secondary-color);
    }
  }
}
.th__student-name {
  display: grid;
  padding: 0.5rem 0rem;
  align-items: center;
  margin: auto;
}
.text {
  padding-top: 0.5rem;
  text-align: left;
}
/*

.th__list-wrapper {
  padding: 0;
  list-style-type: none;
  max-width: 43.5%;
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}
.th__list-wrapper > li > * {
  text-align: center;
}
li > p > a {
  font-weight: bold;
  text-decoration-color: var(--secondary-color);
  color: var(--font-color);
}
.th__list-wrapper > li {
  min-width: 46%;
  max-width: 100%;
  text-align: center;
  padding: 0 0.5rem;
}

.th__student-name {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 0.95em;
  text-decoration-color: var(--secondary-color);
  color: var(--font-color);
  i {
    font-size: 1rem;
  }
}*/
</style>
