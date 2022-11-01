<template>
  <header class="page-heading">
    <h2 class="page-heading__title">Meetings</h2>
    <p class="page-heading__subtitle">Join in and learn</p>
  </header>
  <div v-if="meetings.length === 0" class="loading__wrapper">
    <img src="@/assets/ferdi.png" alt="ferdi" class="loading__ferdi" />
    <p>Ferdi is getting your dates..</p>
  </div>
  <div>
    <div class="week-input__wrapper">
      <label for="week" class="week-input__label">Choose a week</label>
      <input
        type="week"
        name="week"
        min="2022-W01"
        v-model="inputWeek"
        class="week-input__select"
      />
      <button @click="getMeetings()" class="week-input__button">
        Get Meetings
      </button>
    </div>
    <ol class="meetings" v-if="!error">
      <div v-for="weekday in weekdays" :key="weekday" class="meetings__weekday">
        <div class="meetings__weekday-header">{{ weekday }}</div>
        <div
          v-for="meeting in meetingsByWeekday(weekday)"
          :key="meeting"
          class="meeting"
        >
          <div>
            {{ formatDate(meeting.start.dateTime) }} -
            {{ formatDate(meeting.end.dateTime) }}
          </div>

          <div>
            {{ meeting.summary }}
          </div>
          <div class="meeting__trainers">
            <div
              v-for="trainer in meeting.trainers"
              :key="trainer"
              class="meeting__trainer"
            >
              <img :src="trainer.picture" :alt="trainer.alt" />
            </div>
          </div>
          <a
            v-if="meeting.location"
            :href="meeting.location"
            target="_blank"
            rel="noopener noreferrer"
            >Join Meeting</a
          >
        </div>
      </div>
    </ol>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import { firebaseFunctionsPrefix } from "../firebase";
import { formatTime } from "../schedule/schedule";

export default {
  name: "Meetings",
  data: () => {
    return {
      meetings: [],
      currentCalendarWeek: "",
      currentYear: "",
      weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      inputWeek: "",
      error: null,
      trainerInfos: {
        "nico.koenig@coding-bootcamps.eu": {
          picture: "img/trainers/nico_profile_pic.png",
          alt: "Nico",
        },
        "ferdinand.niemann@coding-bootcamps.eu": {
          picture: "img/trainers/ferdi_profile_pic.png",
          alt: "Ferdi",
        },
        "sarah.maerdian@coding-bootcamps.eu": {
          picture: "img/trainers/sarah_profile_pic.png",
          alt: "Sarah",
        },
        "joe.gregory@coding-bootcamps.eu": {
          picture: "img/trainers/joe_profile_pic.png",
          alt: "Joe",
        },
        "robin.boehm@coding-bootcamps.eu": {
          picture: "img/trainers/robin_profile_pic.png",
          alt: "Robin",
        },
        "mareike.kirch@coding-bootcamps.eu": {
          picture: "img/trainers/mareike_profile_pic.png",
          alt: "Mareike",
        },
        nobody: {
          picture: "img/trainers/question_mark.png",
          alt: "Nobody",
        },
        //TODO: Insert fitting Images to the following keys:
        "trainers@coding-bootcamps.eu": {
          picture: "img/trainers/question_mark.png",
          alt: "Trainers",
        },
        "team@coding-bootcamps.eu": {
          picture: "img/trainers/question_mark.png",
          alt: "Team",
        },
        Mittagspause: {
          picture: "img/trainers/lunch.png",
          alt: "Mittagspause",
        },
        Together: {
          picture: "img/trainers/together.png",
          alt: "Together",
        },
      },
    };
  },
  computed: {
    todaysDay() {
      const today = new Date().getDay();
      const todaysWeekday = this.weekdays[today - 1];
      return todaysWeekday;
    },
  },
  created() {
    // TODO: Implement weekly overview
    // /week?year=2022&week=43
    // For meetings today: (`${firebaseFunctionsPrefix}/studenthub/meetings/today`);
    this.setCurrentCalendarWeek();
    this.setCurrentYear();
    this.getMeetingData(this.currentCalendarWeek, this.currentYear);
  },
  methods: {
    getMeetingData(week, year) {
      fetch(
        `${firebaseFunctionsPrefix}/studenthub/meetings/week?year=${year}&week=${week}`,
        {
          headers: {
            Authorization: "Bearer " + this.$store.getters.accessToken,
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            this.error = null;
            return res.json();
          } else {
            this.error = "Could not load meetings";
          }
        })
        .then((meetings) => {
          if (meetings) {
            this.meetings = meetings.map((meeting) => {
              meeting.start.dateTime = new Date(meeting.start.dateTime);
              meeting.end.dateTime = new Date(meeting.end.dateTime);
              meeting.trainers = this.filterForTrainers(meeting);
              meeting.weekday = this.getWeekday(meeting);
              return meeting;
            });
          }
        });
    },

    setCurrentCalendarWeek() {
      let date = new Date();
      date.setHours(0);
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
      // January 4 is always in week 1.
      let week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      this.currentCalendarWeek =
        1 +
        Math.round(
          ((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            ((week1.getDay() + 6) % 7)) /
            7
        );
    },

    setCurrentYear() {
      this.currentYear = new Date().getFullYear();
    },

    getMeetings() {
      let date = this.inputWeek;
      let year = date.substring(0, 4);
      let week = date.substring(6, 8);

      this.getMeetingData(week, year);
    },

    formatDate(d) {
      return formatTime(d);
    },

    filterForTrainers(meeting) {
      const attendeeArray = meeting.attendees || [];
      let trainers = attendeeArray
        .filter((a) => a.email.includes("@coding-bootcamps.eu"))
        .map((t) => this.trainerInfos[t.email])
        .filter((t) => t !== undefined);

      if (
        meeting.summary === "🐛🐦 Gemeinsamer Wochenstart" ||
        meeting.summary === "Wochenabschluss" ||
        meeting.summary === "Daily Checkout" ||
        meeting.summary === "Daily Checkin"
      ) {
        trainers.push(this.trainerInfos["Together"]);
      }

      if (meeting.summary === "Mittagspause") {
        trainers.push(this.trainerInfos["Mittagspause"]);
      }

      if (trainers.length === 0) {
        trainers.push(this.trainerInfos["nobody"]);
      }

      return trainers;
    },

    getWeekday(meeting) {
      const weekdayNumber = new Date(meeting.start.dateTime).getDay();
      const weekday = this.weekdays[weekdayNumber - 1];
      return weekday;
    },

    meetingsByWeekday(day) {
      return this.meetings.filter((m) => m.weekday === day);
    },
  },
};
</script>

<style lang="css" scoped>
a {
  color: initial;
  text-decoration: underline;
  cursor: pointer;
}
.week-input__label {
  font-size: 1rem;
  display: block;
  color: #999999;
  margin-bottom: 0.2rem;
}

.week-input__select {
  height: 1.75rem;
  margin-right: 0.5rem;
}

.week-input__button {
  height: 2rem;
}
.meetings {
  list-style-type: none;
  padding: 0;
}

.meetings__weekday {
  border-bottom: 1px solid black;
  padding: 2rem 0;
}

.meetings__weekday-header {
  font-weight: 600;
  text-transform: uppercase;
}

.activeDay {
  background-color: hotpink;
}

.meeting {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
}

.meeting + .meeting {
  margin-top: 0.5rem;
}

.meeting__trainers {
  display: flex;
  justify-content: center;
}

.meeting__trainer {
  display: flex;
}

.loading__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading__ferdi {
  animation: loading__ferdi 5s infinite linear;
}

@keyframes loading__ferdi {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
