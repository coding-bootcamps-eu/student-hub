<template>
  <header class="page-heading">
    <h2 class="page-heading__title">Schedule</h2>
    <p class="page-heading__subtitle">{{ scheduleHeading }}</p>
  </header>
  <div class="schedule">
    <div
      v-if="
        this.$store.getters.canShowSchedule || this.$store.getters.isTeacher
      "
    >
      <template v-if="this.$store.getters.isTeacher">
        <select name="" id="selected-class" v-model="selectedClass">
          <option
            v-for="className in classes"
            :key="className"
            :value="className"
          >
            {{ className }}
          </option>
        </select>
      </template>
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
    this.selectedClass = this.classes[0];
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
      if (this.$store.getters.isStudent) {
        return "Your personal bootcamp schedule";
      } else if (this.$store.getters.isTeacher && this.selectedClass) {
        return "Schedule of Class " + this.selectedClass;
      } else {
        return "";
      }
    },
    daysInBootcamp() {
      let studentStartDate = new Date(this.$store.state.startDate);
      let today = new Date();
      return calculateWorkingDaysSinceCampStart(studentStartDate, today);
    },
    schedule() {
      if (this.$store.getters.isStudent) {
        let studentStartDate = new Date(this.$store.state.startDate);
        let className = this.$store.state.className;
        return calculateSchedule(studentStartDate, className);
      } else if (this.$store.getters.isTeacher && this.selectedClass) {
        const className = this.selectedClass.substring(0, 7);
        return calculateSchedule(new Date(this.selectedClass), className);
      } else {
        return [];
      }
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
