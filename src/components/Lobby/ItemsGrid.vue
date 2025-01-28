<template>
  <div class="lobby-grid__container">
    <nav class="lobby-grid__nav">
      <div class="zoom-container" v-if="zoomRooms">
        <h2>Zoom-Räume</h2>
        <div class="rooms">
          <AccentButton v-for="room of zoomRooms.meetings" :key="room.className" :title="room.topic"
            :to="room.join_url">
            <span class="recording-icon" v-if="room.recording"></span>
          </AccentButton>
        </div>
      </div>
      <a class="lobby-grid__link card card-accent"
        href="https://form.asana.com/?k=msqPDRYEAxA8uspT_xcYbw&d=1181024715195521" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="bi bi-calendar-check">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>

        <span class="lobby-grid__link-text">Abwesenheit melden</span>
      </a>
      <router-link class="lobby-grid__link card card-accent" to="/schedule">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
          <path
            d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
          <path
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
        </svg>
        <span class="lobby-grid__link-text">Module und Ressourcen</span>
      </router-link>
      <router-link class="lobby-grid__link card card-accent" to="/recordings">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-camera-video" viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
        </svg>
        <span class="lobby-grid__link-text">Aufzeichnungen</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
import AccentButton from "@/components/AccentButton.vue";
import rooms from "@/zoom/rooms.js"
export default {
  components: {
    AccentButton
  },

  data() {
    return {
      meetings: rooms
    }
  },

  props: {
    view: String,
  },
  computed: {
    isTeacher() {
      return this.$store.getters.isTeacher;
    },
    isStudent() {
      return this.$store.getters.isStudent || this.$store.getters.isAlumni;
    },
    isStudentView() {
      return this.view === "student";
    },
    className() {
      return this.$store.getters.currentClassName
    },
    isPartTime() {
      return this.$store.getters.isPartTimeStudent
    },
    zoomRooms() {
      if (this.isPartTime) return
      // if (this.className) return
      const currentClass = this.className

      return this.meetings.find(function (meeting) {
        return meeting.slug === currentClass;
      })
    }
  },
};
</script>
<style scoped>
.lobby-grid__container {
  container-type: inline-size;
  container-name: lobby-grid;
}

.lobby-grid__nav {
  --columns: 2;

  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: 1rem;
}

.zoom-container {
  background-color: var(--clr-accent-light);

  border-radius: var(--radius-inner);
  padding: 1rem;

  grid-row: span 2;
}

.zoom-container {
  color: var(--clr-accent);
  text-align: center;
}

.rooms {
  margin-block: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.rooms>* {
  background-color: transparent;
  color: var(--clr-accent);

  width: 50%;
  border: 2px solid var(--clr-accent);
}

rooms>* a:hover {
  color: var(--clr-white);
}

.recording-icon {
  background-color: red;

  display: inline-block;
  margin-right: .5rem;
  vertical-align: middle;
  width: 1rem;
  aspect-ratio: 1;
  border-radius: 50%;

  animation: pulse 2000ms infinite;
}

@keyframes pulse {
  0% {
    background-color: red;
  }

  50% {
    background-color: rgba(255, 0, 0, 0.487);
  }

  100% {
    background-color: red;
  }
}

.lobby-grid__link {
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.lobby-grid__link>svg {
  width: var(--s-large);
  margin-bottom: var(--s-base);
}

@container lobby-grid (min-width: 768px) {
  .lobby-grid__nav {
    --columns: 3;
  }
}

@container lobby-grid (min-width: 1200px) {
  .lobby-grid__nav {
    --columns: 4;
  }
}

@media screen and (min-width: 768px) {
  .lobby-grid__link:hover {
    background: #595959;
  }
}
</style>
