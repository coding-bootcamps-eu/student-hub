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
          {{
            className === partTimeClassName
              ? partTimeClassName
              : className.substring(0, 7)
          }}
        </option>
      </select>
      &nbsp;
      <input
        type="checkbox"
        checked
        name=""
        id="show-today"
        v-if="!partTimeScheduleSelected"
      />
      <label for="show-today" v-if="!partTimeScheduleSelected"
        >Show only schedule for Today</label
      >
      <ul>
        <li
          v-for="day in schedule"
          :key="day.dayInSchedule"
          class="schedule-day"
          :class="classesForDay(day.date)"
        >
          <p class="schedule-day__date" v-if="!partTimeScheduleSelected">
            {{ formatDate(day.date) }}
          </p>
          <p class="schedule-day__topic">
            {{ day.topic }}
            <span v-if="partTimeScheduleSelected && day.totalTopicDays"
              >({{ day.totalTopicDays * 8 }} Hours)</span
            >
            <span v-if="day.totalTopicDays > 1 && !partTimeScheduleSelected"
              >(Day {{ day.dayOfTopic }} of {{ day.totalTopicDays }})</span
            >
          </p>

          <div v-if="day.details" class="schedule-day__details">
            <a
              v-if="day.details.classRoomLink"
              target="_blank"
              rel="noreferrer"
              :href="day.details.classRoomLink"
              >Videos</a
            >
            <a
              v-if="day.details.gitHubLink"
              target="_blank"
              rel="noreferrer"
              :href="day.details.gitHubLink"
              >Tasks</a
            >
            <a
              v-if="day.details.slidesLink"
              target="_blank"
              rel="noreferrer"
              :href="day.details.slidesLink"
              >Slides</a
            >&nbsp;
          </div>
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
  calculateStaticSchedule,
} from "../schedule/schedule";

export default {
  name: "Schedule",
  data: () => {
    return {
      partTimeClassName: "Teilzeit",
      selectedClass: undefined,
      classes: [],
    };
  },
  created() {
    this.classes = ["Teilzeit", ...classNames];
    if (this.$store.state.className) {
      const selectedClass = classNames.filter((c) =>
        c.startsWith(this.$store.state.className)
      )[0];
      if (selectedClass === undefined) {
        this.selectedClass = this.classes[0];
      } else {
        this.selectedClass = selectedClass;
      }
    } else {
      this.selectedClass = this.classes[0];
    }
  },
  methods: {
    formatDate(d) {
      return formatDate(d);
    },
    classesForDay(date) {
      if (this.partTimeScheduleSelected) {
        return {
          past: false,
          today: false,
          future: true,
        };
      } else {
        const today = normalizeDate(new Date());
        return {
          past: date < today,
          today: formatDate(date) === formatDate(today),
          future: date > today,
        };
      }
    },
  },
  computed: {
    partTimeScheduleSelected() {
      return this.selectedClass === this.partTimeClassName;
    },
    scheduleHeading() {
      if (this.selectedClass) {
        return "Schedule of Class " + this.selectedClass.substring(0, 7);
      }
      return "Schedule";
    },
    daysInBootcamp() {
      let studentStartDate = new Date(this.$store.state.startDate);
      let today = new Date();
      return calculateWorkingDaysSinceCampStart(studentStartDate, today);
    },
    schedule() {
      const className = this.selectedClass.substring(0, 7);
      if (this.partTimeScheduleSelected) {
        return calculateStaticSchedule();
      } else {
        return calculateSchedule(new Date(this.selectedClass), className);
      }
    },
  },
};
</script>

<style lang="css" scoped>
#show-today:checked ~ ul > .past,
#show-today:checked ~ ul > .future {
  display: none;
}

#show-today:checked ~ ul > .today {
  display: initial;
}

ul {
  list-style-type: none;
  padding: 0;
}

li + li {
  margin-top: 1rem;
}

.schedule-day__date {
  font-weight: 700;
  margin: 0;
}

.schedule-day__topic {
  margin: 0;
}

.past {
  color: #555;
}

.today {
  margin: 3rem 0;
  color: black;
  font-size: 150%;
}

.future {
  color: #000;
}

a {
  color: blue;
  text-decoration: underline;
}

a + a {
  padding-left: 0.25rem;
}
</style>
