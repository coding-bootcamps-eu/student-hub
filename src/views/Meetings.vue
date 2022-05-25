<template>
  <header class="page-heading">
    <h2 class="page-heading__title">Todays Meetings</h2>
    <p class="page-heading__subtitle">Join in and learn</p>
  </header>
  <div>
    <ol class="meetings">
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
    };
  },
  created() {
    fetch(`${firebaseFunctionsPrefix}/studenthub/meetings/today`)
      .then((res) => res.json())
      .then((meetings) => {
        this.meetings = meetings.map((meeting) => {
          meeting.start.dateTime = new Date(meeting.start.dateTime);
          meeting.end.dateTime = new Date(meeting.end.dateTime);
          return meeting;
        });
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
</style>
