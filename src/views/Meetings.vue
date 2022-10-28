<template>
  <header class="page-heading">
    <h2 class="page-heading__title">Todays Meetings</h2>
    <p class="page-heading__subtitle">Join in and learn</p>
  </header>
  <div v-if="meetings.length === 0" class="loading__wrapper">
    <img src="@/assets/ferdi.png" alt="ferdi" class="loading__ferdi" />
    <p>Ferdi is getting your dates..</p>
  </div>
  <div>
    <ol class="meetings" v-if="!error">
      <li v-for="meeting in meetings" v-bind:key="meeting.id" class="meeting">
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
      </li>
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
      error: null,
      availableTrainers: [
        {
          name: "Nico",
          picture: "img/trainers/nico_profile_pic.png",
          alt: "Nico",
          id: "1",
        },
        {
          name: "Ferdinand",
          picture: "img/trainers/ferdi_profile_pic.png",
          alt: "Ferdinand",
          id: "2",
        },
        {
          name: "Sarah",
          picture: "img/trainers/sarah_profile_pic.png",
          alt: "Sarah",
          id: "3",
        },
        {
          name: "Joe",
          picture: "img/trainers/joe_profile_pic.png",
          alt: "Joe",
          id: "4",
        },
        {
          name: "Robin",
          picture: "img/trainers/robin_profile_pic.png",
          alt: "Robin",
          id: "5",
        },
        {
          name: "Mareike",
          picture: "img/trainers/mareike_profile_pic.png",
          alt: "Mareike",
          id: "6",
        },
        {
          name: "Nobody",
          picture: "img/trainers/question_mark.png",
          alt: "Nobody",
          id: "X",
        },
      ],
    };
  },
  created() {
    // TODO: Implement weekly overview
    // /week?year=2022&week=43
    console.log(`${firebaseFunctionsPrefix}/studenthub/meetings/today`);
    fetch(`${firebaseFunctionsPrefix}/studenthub/meetings/today`, {
      headers: {
        Authorization: "Bearer " + this.$store.getters.accessToken,
      },
    })
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
            console.log(meeting.trainers);
            return meeting;
          });
        }
      })
      .then(() => console.log(this.meetings));
  },
  methods: {
    formatDate(d) {
      return formatTime(d);
    },

    async getImgPath(path) {
      return await require(path);
    },

    filterForTrainers(meeting) {
      //TODO: Refactor code. Ex.: Filter for attendee-emails with *@coding-bootcamps.eu and take the *-part as Trainer
      //TODO: Create trainer objects with profile pics? Or fetch them from the google account
      //TODO: Longterm: Fetch trainers from CBE trainer list and also fetch profile pics
      //TODO: Swap Images of "Mittagspause" and "Daily Checkout" for fitting img
      const trainers = [];
      const attendeeArray = meeting.attendees;

      if (Array.isArray(attendeeArray)) {
        attendeeArray.forEach((attendee) => {
          if (attendee.email === "nico.koenig@coding-bootcamps.eu") {
            trainers.push(
              this.availableTrainers.find((trainer) => trainer.id === "1")
            );
          } else if (
            attendee.email === "ferdinand.niemann@coding-bootcamps.eu"
          ) {
            trainers.push(
              this.availableTrainers.find((trainer) => trainer.id === "2")
            );
          } else if (attendee.email === "sarah.maerdian@coding-bootcamps.eu") {
            trainers.push(
              this.availableTrainers.find((trainer) => trainer.id === "3")
            );
          } else if (attendee.email === "joe.gregory@coding-bootcamps.eu") {
            trainers.push(
              this.availableTrainers.find((trainer) => trainer.id === "4")
            );
          } else if (attendee.email === "robin.boehm@coding-bootcamps.eu") {
            trainers.push(
              this.availableTrainers.find((trainer) => trainer.id === "5")
            );
          } else if (attendee.email === "mareike.kirch@coding-bootcamps.eu") {
            trainers.push(
              this.availableTrainers.find((trainer) => trainer.id === "6")
            );
          } else if (trainers.length === 0) {
            trainers.push(
              this.availableTrainers.find((trainer) => trainer.id === "X")
            );
          }
        });
      }
      return trainers;
    },
  },
  computed: {},
};
</script>

<style lang="css" scoped>
.meetings {
  list-style-type: none;
  padding: 0;
}

.meeting {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  border: 1px solid black;
}
.meeting + .meeting {
  margin-top: 0.5rem;
}

.meeting__trainers {
  display: flex;
}

.meeting__trainer {
  display: flex;
}

a {
  color: initial;
  text-decoration: underline;
  cursor: pointer;
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
