<template>
  <header class="page-heading">
    <h2 class="page-heading__title">Schedule</h2>
    <p class="page-heading__subtitle">{{ scheduleHeading }}</p>
  </header>
  <div class="schedule">
    <div>
      <label for="selected-class">Selected Class</label>&nbsp;
      <select name="" id="selected-class" v-model="selectedClass">
        <option
          v-for="className in classes"
          :key="className"
          :value="className"
        >
          {{ className.substring(0, 7) }}
        </option>
      </select>

      <ul>
        <li
          v-for="day in schedule"
          :key="day.dayInSchedule"
          class="schedule-day"
          :class="classesForDay(day.date)"
        >
          {{ formatDate(day.date) }}: {{ day.topic }} ({{ day.dayOfTopic }}/{{
            day.totalTopicDays
          }})
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  calculateWorkingDaysSinceCampStart,
  calculateSchedule,
  formatDate,
  normalizeDate,
  classNames,
} from "../schedule/schedule";

export default {
  name: "Schedule",
  data: () => {
    return {
      selectedClass: undefined,
      classes: [],
    };
  },
  created() {
    this.classes = classNames;
    if (this.$store.state.className) {
      this.selectedClass = classNames.filter((c) =>
        c.startsWith(this.$store.state.className)
      )[0];
    } else {
      this.selectedClass = this.classes[0];
    }
  },
  methods: {
    formatDate(d) {
      return formatDate(d);
    },
    classesForDay(date) {
      const today = normalizeDate(new Date());
      return {
        past: date < today,
        today: formatDate(date) === formatDate(today),
        future: date > today,
      };
    },
  },
  computed: {
    scheduleHeading() {
      return "Schedule of Class " + this.selectedClass.substring(0, 7);
    },
    daysInBootcamp() {
      let studentStartDate = new Date(this.$store.state.startDate);
      let today = new Date();
      return calculateWorkingDaysSinceCampStart(studentStartDate, today);
    },
    schedule() {
      const className = this.selectedClass.substring(0, 7);
      return calculateSchedule(new Date(this.selectedClass), className);
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
