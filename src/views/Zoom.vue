<template>
  <header class="page-heading">
    <h2 class="page-heading__title">Zoom Rooms</h2>
    <p class="page-heading__subtitle">Meeting Rooms of each Class</p>
  </header>
  <div v-if="isLoading" class="loading__wrapper">
    <p>Loading zoom rooms...</p>
  </div>
  <div v-if="!isLoading">
    <p>
      Zoom Rooms that are marked as "Live Sessions" will be automatically
      recorded.
    </p>
    <ul>
      <li v-for="meeting in meetings" :key="meeting.uuid">
        <h3>{{ meeting.className }}</h3>
        <ul>
          <li v-for="meeting in meeting.meetings" :key="meeting.uuid">
            <a
              :href="meeting.join_url"
              target="_blank"
              rel="noopener noreferrer"
              >{{ meeting.topic }}</a
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div v-if="!isLoading">
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import rooms from "@/zoom/rooms.js";

export default {
  name: "Zoom",
  data: () => {
    return {
      isLoading: false,
      meetings: rooms,
    };
  },
  computed: {},
  created() {
    /*
    DISABLED See Asana Issue: https://app.asana.com/0/1205379464030313/1205601215812002
    fetch(`${firebaseFunctionsPrefix}/zoom/class-rooms`, {
      headers: {
        Authorization: "Bearer " + this.$store.getters.accessToken,
      },
    })
      .then((res) => res.json())
      .then((meetings) => {
        this.meetings = meetings.map((meeting) => {
          let className = meeting.meetings[0].topic;
          if (className.includes("Live-Session")) {
            className = className.replace("Live-Session", "").trim();
          }
          meeting.className = className;
          return meeting;
        });
        this.isLoading = false;
      });*/
  },
  methods: {},
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
