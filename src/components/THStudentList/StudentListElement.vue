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
              class="answer-lp"
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
  gap: 0.4rem;
}
.th__list-wrapper > * {
  width: 100%;
  height: 100%;
}
.th__list-wrapper > li > * {
  padding: 0;
  margin: 0;
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
.schedule,
.details {
  text-align: left;
  font-size: 0.85em;
}

.lpList {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.lpList > li {
  margin: 0.5rem;
}
.answer-lp {
  background-color: var(--background-color);
  padding: 0.2rem;
  border-radius: 0.25rem;
  transition: background-color 250ms ease-in-out;
  box-shadow: hsl(268, 76, 65, 0.6) 0px 1px 3px,
    hsl(268, 76, 65, 0.7) 0px 1px 2px;
  &:hover {
    background-color: var(--light-grey);
  }
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
  padding-bottom: 0.5rem;
  text-align: left;
  font-size: 0.8em;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.text > p {
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background-color 250ms ease-in-out;
  box-shadow: hsl(268, 76, 65, 0.5) 0px 1px 3px,
    hsl(268, 76, 65, 0.6) 0px 1px 2px;
  &:hover {
    background-color: var(--light-grey);
  }
}
.details {
  padding-top: 0.4rem;
}
</style>
