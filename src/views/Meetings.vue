<template>
  <header class="page-heading">
    <h2 class="page-heading__title">Todays Meetings</h2>
    <p class="page-heading__subtitle">Join in and learn</p>
  </header>
  <div v-if="meetings.length === 0" class="loading__wrapper">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p>getting dates..</p>
  </div>
  <div>
    <ol class="meetings" v-if="!error">
      <li v-for="meeting in meetings" v-bind:key="meeting.id" class="meeting">
        {{ formatDate(meeting.start.dateTime) }} -
        {{ formatDate(meeting.end.dateTime) }}
        {{ meeting.summary }}

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
            return meeting;
          });
        }
      });
  },
  methods: {
    formatDate(d) {
      return formatTime(d);
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

.meeting + .meeting {
  margin-top: 0.5rem;
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

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #262626;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #262626 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
