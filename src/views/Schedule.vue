<template>
  <header class="page-heading">
    <h2 class="page-heading__title">Schedule</h2>
    <p class="page-heading__subtitle">Your personal bootcamp schedule</p>
  </header>
  <div class="schedule">
    <div v-if="this.$store.getters.canShowSchedule">
      <ul>
        <li
          v-for="day in schedule"
          :key="day.dayInSchedule"
          class="schedule-day"
          :class="{
            today: day.dayInSchedule === daysInBootcamp,
            past: day.dayInSchedule < daysInBootcamp,
            future: day.dayInSchedule > daysInBootcamp,
          }"
        >
          {{ formatDate(day.date) }}: {{ day.topic }} ({{ day.dayOfTopic }}/{{
            day.totalTopicDays
          }})
        </li>
      </ul>
    </div>
    <div v-else>
      No schedule available - reasons can maybe
      <ul>
        <li>Your are a part-time student</li>
        <li>Your are not a student</li>
        <li>There is no start date assigned in the database</li>
        <li>This app has a bug 🤷‍♂️</li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  calculateWorkingDaysSinceCampStart,
  calculatePersonalSchedule,
  formatDate,
} from "../schedule/schedule";

export default {
  name: "Schedule",
  data: () => {
    return {};
  },
  methods: {
    formatDate(d) {
      return formatDate(d);
    },
  },
  computed: {
    daysInBootcamp() {
      let studentStartDate = new Date(
        this.$store.state.startDate.seconds * 1000
      );
      let today = new Date();
      return calculateWorkingDaysSinceCampStart(studentStartDate, today);
    },
    schedule() {
      let studentStartDate = new Date(
        this.$store.state.startDate.seconds * 1000
      );
      return calculatePersonalSchedule(studentStartDate);
    },
  },
};
</script>

<style lang="css">
.past {
  color: #555;
}

.today {
  margin: 1rem 0;
  color: black;
  font-weight: 800;
  font-size: 120%;
}

.future {
  color: #000;
}
</style>
