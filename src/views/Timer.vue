<template>
  <div v-if="!timerActive" class="container">
    <h1 class="title-timer">Timer</h1>
    <p class="title-timer-paragraph">Let's go!! - Working productively</p>
    <h3 class="heading-timer">
      Working time
      <span
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-briefcase"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"
          />
        </svg>
        {{ timeLeft }}</span
      >
    </h3>
    <ul class="list-container-timer">
      <li v-for="time in workingTime" :key="time.sec" class="list">
        <button @click="setTime(time.sec, 'work')" class="btn-timer">
          {{ time.display }}
        </button>
      </li>
    </ul>
    <h3 class="heading-timer">
      Break time
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-cup-straw"
          viewBox="0 0 16 16"
        >
          <path
            d="M13.902.334a.5.5 0 0 1-.28.65l-2.254.902-.4 1.927c.376.095.715.215.972.367.228.135.56.396.56.82 0 .046-.004.09-.011.132l-.962 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87-1.516 0-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 5.132A.78.78 0 0 1 3.5 5c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 3.614 6.867 3.5 8 3.5c.712 0 1.389.045 1.985.127l.464-2.215a.5.5 0 0 1 .303-.356l2.5-1a.5.5 0 0 1 .65.278zM9.768 4.607A13.991 13.991 0 0 0 8 4.5c-1.076 0-2.033.11-2.707.278A3.284 3.284 0 0 0 4.645 5c.146.073.362.15.648.222C5.967 5.39 6.924 5.5 8 5.5c.571 0 1.109-.03 1.588-.085l.18-.808zm.292 1.756C9.445 6.45 8.742 6.5 8 6.5c-1.133 0-2.176-.114-2.95-.308a5.514 5.514 0 0 1-.435-.127l.838 8.03c.013.121.06.186.102.215.357.249 1.168.69 2.438.69 1.27 0 2.081-.441 2.438-.69.042-.029.09-.094.102-.215l.852-8.03a5.517 5.517 0 0 1-.435.127 8.88 8.88 0 0 1-.89.17zM4.467 4.884s.003.002.005.006l-.005-.006zm7.066 0-.005.006c.002-.004.005-.006.005-.006zM11.354 5a3.174 3.174 0 0 0-.604-.21l-.099.445.055-.013c.286-.072.502-.149.648-.222z"
          /></svg
        >{{ timeLeft }}</span
      >
    </h3>
    <ul class="list-container-timer">
      <li v-for="pause in pauseTime" :key="pause.sec" class="list">
        <button @click="setTime(pause.sec, 'pause')" class="btn-timer">
          {{ pause.display }}
        </button>
      </li>
    </ul>
  </div>
  <div v-else class="container timer">
    <div v-if="type === 'work'">
      <h2 class="heading-timer">
        Working time
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-briefcase"
            viewBox="0 0 16 16"
          >
            <path
              d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"
            /></svg
          >{{ timeLeft }}</span
        >
      </h2>
      <ul class="list-container-timer">
        <li v-for="time in workingTime" :key="time.sec" class="list">
          <button class="active-btn" disabled>
            {{ time.display }}
          </button>
        </li>
      </ul>
    </div>
    <div v-else>
      <h2 class="heading-timer">
        Break time
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cup-straw"
            viewBox="0 0 16 16"
          >
            <path
              d="M13.902.334a.5.5 0 0 1-.28.65l-2.254.902-.4 1.927c.376.095.715.215.972.367.228.135.56.396.56.82 0 .046-.004.09-.011.132l-.962 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87-1.516 0-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 5.132A.78.78 0 0 1 3.5 5c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 3.614 6.867 3.5 8 3.5c.712 0 1.389.045 1.985.127l.464-2.215a.5.5 0 0 1 .303-.356l2.5-1a.5.5 0 0 1 .65.278zM9.768 4.607A13.991 13.991 0 0 0 8 4.5c-1.076 0-2.033.11-2.707.278A3.284 3.284 0 0 0 4.645 5c.146.073.362.15.648.222C5.967 5.39 6.924 5.5 8 5.5c.571 0 1.109-.03 1.588-.085l.18-.808zm.292 1.756C9.445 6.45 8.742 6.5 8 6.5c-1.133 0-2.176-.114-2.95-.308a5.514 5.514 0 0 1-.435-.127l.838 8.03c.013.121.06.186.102.215.357.249 1.168.69 2.438.69 1.27 0 2.081-.441 2.438-.69.042-.029.09-.094.102-.215l.852-8.03a5.517 5.517 0 0 1-.435.127 8.88 8.88 0 0 1-.89.17zM4.467 4.884s.003.002.005.006l-.005-.006zm7.066 0-.005.006c.002-.004.005-.006.005-.006zM11.354 5a3.174 3.174 0 0 0-.604-.21l-.099.445.055-.013c.286-.072.502-.149.648-.222z"
            />
          </svg>
          {{ timeLeft }}</span
        >
      </h2>
      <ul class="list-container-timer">
        <li v-for="pause in pauseTime" :key="pause.sec" class="list">
          <button class="active-btn" disabled>
            {{ pause.display }}
          </button>
        </li>
      </ul>
    </div>
    <button @click="stopTimer()" class="stop-btn">Stop</button>
  </div>
</template>

<script>
export default {
  name: "Timer",

  data() {
    return {
      selectedTime: 0,
      intervalTimer: undefined,
      type: "",
      workingTime: [
        {
          sec: 1200,
          display: "00:20:00",
        },
        {
          sec: 1800,
          display: "00:30:00",
        },
        {
          sec: 2400,
          display: "00:40:00",
        },
      ],
      pauseTime: [
        {
          sec: 300,
          display: "00:05:00",
        },
        {
          sec: 600,
          display: "00:10:00",
        },
        {
          sec: 900,
          display: "00:15:00",
        },
      ],
    };
  },

  methods: {
    setTime(seconds, type) {
      clearInterval(this.intervalTimer);
      this.timer(seconds);
      this.type = type;
    },

    timer(seconds) {
      const now = Date.now();
      const end = now + seconds * 1000;

      this.selectedTime = seconds;
      this.countdown(end);
    },

    stopTimer() {
      clearInterval(this.$store.state.timerInterval);
      this.$store.commit("stopTimer");
      this.selectedTime = 0;
    },

    countdown(end) {
      this.intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft < 0) {
          clearInterval(this.$store.state.timerInterval);
          this.$store.commit("setTimer", undefined);
          return;
        }

        this.$store.commit("setTimeLeft", secondsLeft);
      }, 1000);

      this.$store.commit("setTimer", this.intervalTimer);
    },
  },
  computed: {
    timeLeft() {
      const secondsLeft = this.$store.state.timeLeft;
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      return `00:${formatTimer(minutes)}:${formatTimer(seconds)}`;
    },
    timerActive() {
      return this.$store.state.timerInterval !== undefined;
    },
  },
};

function formatTimer(num) {
  return num < 10 ? `0${num}` : num;
}
</script>

<style lang="css">
.container {
  height: 100%;
  margin: 1rem;
}

.title-timer {
  margin: 0;
}

.title-timer-paragraph {
  margin: 0;
  font-weight: bold;
  color: gray;
}

.heading-timer {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: gray;
}

.heading-timer span {
  display: flex;
  align-items: center;
  color: gray;
  background-color: white;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.4rem 0.8rem;
}

.heading-timer svg {
  margin-right: 0.7rem;
}

.list-container-timer {
  display: inline;
}

.list {
  width: 100%;
  margin-top: 0.5rem;
  list-style-type: none;
}

.btn-timer {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 3px solid gray;
  font-weight: bold;
  cursor: pointer;
}

.btn-timer:hover {
  background-color: gray;
  color: white;
}

.active-btn {
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: lightgray;
  border: 0;
  color: white;
  cursor: unset;
}

.timer {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.stop-btn {
  width: 30%;
  margin: 2rem auto;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 3px solid gray;
  font-weight: bold;
  cursor: pointer;
  color: black;
}

.stop-btn:hover {
  background-color: gray;
  color: white;
}
</style>
