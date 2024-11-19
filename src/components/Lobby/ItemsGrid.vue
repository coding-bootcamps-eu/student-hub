<template>
  <div class="md:col-span-2">
    <template v-if="isStudent || isStudentView">
      <nav class="my-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LinkCard
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :text="link.title">
          <component :is="link.icon + 'Icon'" />
        </LinkCard>
      </nav>
    </template>
    <template v-if="isTeacher && !isStudentView">
      <nav>
        <router-link to="/students">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-people"
            viewBox="0 0 16 16">
            <path
              d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          </svg>
          <span class="lobby-grid__link-text">Students</span>
        </router-link>
        <router-link class="lobby-grid__link card card-accent" to="/recordings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-camera-video"
            viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
          </svg>
          <span class="lobby-grid__link-text">Recordings</span>
        </router-link>
        <router-link
          class="lobby-grid__link card card-accent"
          to="/zoom"
          v-if="this.$store.getters.hasPermissions">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-person-workspace"
            viewBox="0 0 16 16">
            <path
              d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path
              d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
          </svg>
          <span class="lobby-grid__link-text">Zoom Rooms</span>
        </router-link>
        <router-link class="lobby-grid__link card card-accent" to="/schedule">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-calendar-check"
            viewBox="0 0 16 16">
            <path
              d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
            <path
              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>
          <span class="lobby-grid__link-text">Schedule</span>
        </router-link>
      </nav>
    </template>
  </div>
</template>

<script>
import PlayIcon from "../icons/lobby/PlayIcon.vue";
import CalendarIcon from "../icons/lobby/CalendarIcon.vue";
import HospitalIcon from "../icons/lobby/HospitalIcon.vue";

import LinkCard from "@/components/LinkCard.vue";
import AccentButton from "@/components/AccentButton.vue";
import rooms from "@/zoom/rooms.js";
export default {
  components: {
    PlayIcon,
    CalendarIcon,
    HospitalIcon,
    LinkCard,
    AccentButton,
  },

  data() {
    return {
      links: [
        {
          title: "Sessions",
          to: "/recordings",
          icon: "Play",
        },
        {
          title: "Module",
          to: "/schedule",
          icon: "Calendar",
        },
        {
          title: "Abmelden",
          to: "https://form.asana.com/?k=msqPDRYEAxA8uspT_xcYbw&d=1181024715195521",
          icon: "Hospital",
        },
      ],
      meetings: rooms,
    };
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
      return this.$store.getters.currentClassName;
    },
    isPartTime() {
      return this.$store.getters.isPartTimeStudent;
    },
    zoomRooms() {
      if (this.isPartTime) return;
      // if (this.className) return
      const currentClass = this.className;

      return this.meetings.find(function (meeting) {
        return meeting.slug === currentClass;
      });
    },
  },
};
</script>
