<template>
  <section>
    <header class="page-heading">
      <h2 class="page-heading__title">Lobby</h2>
      <p class="page-heading__subtitle">
        Hello, {{ this.$store.getters.userName }} - Let's go!
      </p>
    </header>
    <div class="home">
      <section
        v-if="this.$store.getters.canShowDailyGoal"
        class="home_daily-goal"
      >
        <h3>Your personal goal for today:</h3>
        <p>{{ today.title }} {{ currentStand }}</p>
        <a
          v-if="today.classRoomLink"
          :href="today.classRoomLink"
          target="_blank"
          class="link-today"
          >Videos</a
        >&nbsp;
        <a
          v-if="today.gitHubLink"
          :href="today.gitHubLink"
          target="_blank"
          class="link-today"
          >Tasks</a
        >&nbsp;
        <a
          v-if="today.slidesLink"
          :href="today.slidesLink"
          target="_blank"
          class="link-today"
          >Slides</a
        >&nbsp;
      </section>
      <section class="home__class-goals" v-if="canShowClassGoals">
        <h3>Class goals for today</h3>
        <ul class="home__class-goals-list">
          <li v-for="classGoal in classGoals" :key="classGoal.className">
            <span class="class-goal__class"
              >Class {{ classGoal.className }}:
            </span>
            <span>
              {{ classGoal.goal.topic }}
              {{
                classGoal.goal.dayOfTopic + "/" + classGoal.goal.totalTopicDays
              }}
            </span>
          </li>
        </ul>
      </section>
      <nav class="home__nav">
        <router-link
          class="home__link"
          to="/schedule"
          v-if="this.$store.getters.canShowSchedule"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-calendar-check"
            viewBox="0 0 16 16"
          >
            <path
              d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
            />
            <path
              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
            />
          </svg>
          <span class="home__link-text">Schedule</span>
        </router-link>
        <router-link class="home__link" to="/meetings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-calendar-week"
            viewBox="0 0 16 16"
          >
            <path
              d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"
            />
            <path
              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"
            />
          </svg>
          <span class="home__link-text">Meetings</span>
        </router-link>
        <router-link class="home__link" to="/recordings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-camera-video"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
            />
          </svg>
          <span class="home__link-text">Recordings</span>
        </router-link>
        <router-link class="home__link" to="/slides">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-card-text"
            viewBox="0 0 16 16"
          >
            <path
              d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
            />
            <path
              d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"
            />
          </svg>
          <span class="home__link-text">Slides</span>
        </router-link>
        <router-link class="home__link" to="/students">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-people"
            viewBox="0 0 16 16"
          >
            <path
              d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
            />
          </svg>
          <span class="home__link-text">Students</span>
        </router-link>
        <router-link
          class="home__link"
          to="/1on1"
          v-if="this.$store.getters.hasPermissions"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-calendar-heart"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5ZM1 14V4h14v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1Zm7-6.507c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
            />
          </svg>
          <span class="home__link-text">1on1</span>
        </router-link>
        <router-link
          class="home__link"
          to="/logbook"
          v-if="
            this.$store.getters.hasPermissions &&
            this.$store.getters.canUseLogBook
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-book"
            viewBox="0 0 16 16"
          >
            <path
              d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"
            />
          </svg>
          <span class="home__link-text">Logbook</span>
        </router-link>
      </nav>
    </div>
  </section>
</template>

<script>
import {
  calculateWorkingDaysSinceCampStart,
  calculateSchedule,
  getDailyClassGoals,
} from "../schedule/schedule";
import { scheduleDetails } from "../schedule/schedule-details";

export default {
  name: "Home",
  data: () => {
    return {
      today: {},
      student: true,
    };
  },
  created() {
    this.getScheduleDetailsToday();
  },
  computed: {
    canShowClassGoals() {
      return (
        (this.$store.getters.isStudent &&
          this.$store.state.fulltime === false) ||
        this.$store.getters.isTeacher
      );
    },
    currentStand() {
      if (!this.student) {
        return "Your bootcamp did not start yet or is already over :-)";
      }

      return `${this.today.day}/${this.today.days}`;
    },
    classGoals() {
      return getDailyClassGoals();
    },
  },
  methods: {
    getScheduleDetailsToday() {
      let studentStartDate = new Date(this.$store.state.startDate);
      let today = new Date();
      const workingDays = calculateWorkingDaysSinceCampStart(
        studentStartDate,
        today
      );
      const schedule = calculateSchedule(
        studentStartDate,
        this.$store.state.className
      );
      const goal = schedule[workingDays - 1];
      if (goal === undefined) {
        this.student = false;
        return;
      }
      this.today = scheduleDetails[goal.topic];
      this.today.day = goal.dayOfTopic;
    },
  },
};
</script>

<style lang="css">
.home {
  margin-top: 4rem;
}

.home__class-goals {
  text-align: center;
  margin-bottom: 3rem;
}

.home__class-goals-list {
  list-style-type: none;
  padding: 0;
}

.class-goal__class {
  font-weight: 800;
}

.home_daily-goal {
  text-align: center;
  margin-bottom: 3rem;
}

.home__nav {
  display: grid;
  grid-template-columns: min-content min-content;
  grid-gap: 1rem;
  justify-content: center;
}

.home__link {
  background: #e5e5e5;
  box-shadow: 1px 1px 9px 1px #c4c4c4;
  border-radius: 5px;
  padding: 1rem 3rem;
  color: #292929;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
}

.home__link:hover {
  background-color: #595959;
  color: #ffffff;
}

.home__link > svg {
  color: rgba(38, 38, 38, 0.4);
  width: 2rem;
  margin-bottom: 1rem;
}

.home__link:hover > svg {
  color: rgba(242, 242, 242, 0.57);
}

.link-today {
  color: blue;
  text-decoration: underline;
}
</style>
