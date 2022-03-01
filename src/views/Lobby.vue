<template>
  <section>
    <header class="page-heading">
      <h2 class="page-heading__title">Lobby</h2>
      <p class="page-heading__subtitle">
        Hello, {{ this.$store.getters.userName }} - Let's go!
      </p>
    </header>
    <div class="home">
      <section v-if="canShowTodaysGoal" class="home_daily-goal">
        <h3>{{ todaysGoal }}</h3>
      </section>
      <nav class="home__nav">
        <router-link class="home__link" to="/schedule">
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
        <router-link class="home__link" to="/timer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-stopwatch home__link-icon"
            viewBox="0 0 16 16"
          >
            <path
              d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z"
            />
            <path
              d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z"
            />
          </svg>
          <span class="home__link-text">Timer</span>
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
      </nav>
    </div>
  </section>
</template>

<script>
import {
  calculateWorkingDaysSinceCampStart,
  calculateSchedule,
  bootcampDays,
  normalizeDate,
} from "../schedule/schedule";

export default {
  name: "Home",
  data: () => {
    return {};
  },
  created: () => {},
  computed: {
    todaysGoal() {
      let studentStartDate = new Date(
        this.$store.state.startDate.seconds * 1000
      );
      let today = new Date();
      const workingDays = calculateWorkingDaysSinceCampStart(
        studentStartDate,
        today
      );
      const schedule = calculateSchedule();
      const goal = schedule[workingDays - 1];

      if (goal !== undefined) {
        return `Day ${goal.dayOfTopic}/${goal.totalTopicDays} of "${goal.topic}"`;
      } else {
        return `Final Project`;
      }
    },
    canShowTodaysGoal() {
      if (!this.$store.getters.isStudent) {
        return false;
      }

      let daysInCamp = bootcampDays + 1;
      if (this.$store.state.startDate) {
        daysInCamp = calculateWorkingDaysSinceCampStart(
          new Date(this.$store.state.startDate.seconds * 1000),
          new Date()
        );
      }

      return (
        this.$store.getters.isStudent &&
        this.$store.state.startDate &&
        this.$store.state.fulltime === true &&
        daysInCamp <= bootcampDays
      );
    },
  },
  methods: {},
};
</script>

<style lang="css">
.home {
  margin-top: 4rem;
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
</style>
