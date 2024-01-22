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
export default {
  name: "Zoom",
  data: () => {
    return {
      isLoading: false,
      meetings: [
        {
          uuid: "5699d5b2-b139-bvc2-af28-8914ca5d8dfr",
          className: "Dezember 2023",
          meetings: [
            {
              uuid: "9699d5b2-b139-4dc2-af67-8914ca6d8df0",
              join_url:
                "https://us06web.zoom.us/j/88278476830?pwd=NmdJcXBqL2FvQWhsUEs0MTVyOG9vdz09",
              topic: "Live-Session (Recording)",
            },
            {
              uuid: "98a38579-c728-41b8-85a2-e39e48f360a4",
              join_url:
                "https://us06web.zoom.us/j/82351898270?pwd=aGN6WmNJL1hkUjlSY3dzR3RuTzR2QT09",
              topic: "General Classroom (Without Recording)",
            },
          ],
        },
        {
          uuid: "759783c4-25f6-46b6-9cac-48185e97d99f",
          className: "Oktober 2023",
          meetings: [
            {
              uuid: "435fdcca-08ae-4276-8da7-abaef82c6950",
              join_url:
                "https://us06web.zoom.us/j/84510144317?pwd=N2M2d0tKVm53VEo1YzY1ZVVMZlludz09",
              topic: "Live-Session (Recording)",
            },
            {
              uuid: "c05db3fc-3b7a-49a8-ad59-6e258f4e6c29",
              join_url:
                "https://us06web.zoom.us/j/83305436865?pwd=eE1MOWFZbWVrYnQ3aGxNSThUc1cxdz09 ",
              topic: "General Classroom (Without Recording)",
            },
          ],
        },
        {
          uuid: "9699d5b2-b139-4dc2-af28-8914ca5d8dfr",
          className: "September 2023",
          meetings: [
            {
              uuid: "9699d5b2-b139-4dc2-af28-8914ca5d8df0",
              join_url:
                "https://us06web.zoom.us/j/88241301781?pwd=dXQxa1NvT1BhVE5OdVBhQzQ1WnRvQT09",
              topic: "Live-Session (Recording)",
            },
            {
              uuid: "98a38579-c728-41b8-85a2-e39e48f360a4",
              join_url:
                "https://us06web.zoom.us/j/89005032426?pwd=NnExdEdIalpWSkhmTG5aK1c0TE1OZz09",
              topic: "General Classroom (Without Recording)",
            },
          ],
        },
      ],
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
