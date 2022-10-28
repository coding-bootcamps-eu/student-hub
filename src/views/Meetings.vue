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
        Mittagspause: {
          picture: "img/trainers/question_mark.png",
          alt: "Nobody",
        },
        Wochenabschluss: {
          picture: "img/trainers/question_mark.png",
          alt: "Nobody",
        },
      },
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
            return meeting;
          });
        }
      });
  },
  methods: {
    formatDate(d) {
      return formatTime(d);
    },

    async getImgPath(path) {
      return await require(path);
    },

    filterForTrainers(meeting) {
      const attendeeArray = meeting.attendees || [];
      let trainers = attendeeArray
        .filter((a) => a.email.includes("@coding-bootcamps.eu")) // Array (0 - n)
        .map((t) => this.trainerInfos[t.email]);

      if (trainers.length === 0) {
        trainers.push(this.trainerInfos["nobody"]);
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
