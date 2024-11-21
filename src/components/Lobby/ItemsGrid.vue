<template>
  <div class="md:col-span-2">
    <template v-if="isStudent || isStudentView">
      <nav class="my-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <template v-for="link in store.links" :key="link.to">
          <LinkCard v-if="link.to !== '/'" :to="link.to" :text="link.title">
            <component :is="link.icon + 'Icon'" />
          </LinkCard>
        </template>
      </nav>
    </template>
  </div>
</template>

<script>
import PlayIcon from "@/components/icons/lobby/PlayIcon.vue";
import CalendarIcon from "@/components/icons/lobby/CalendarIcon.vue";
import HospitalIcon from "@/components/icons/lobby/HospitalIcon.vue";

import LinkCard from "@/components/LinkCard.vue";
import AccentButton from "@/components/AccentButton.vue";
import rooms from "@/zoom/rooms.js";

import { useAppStore } from "@/stores/app";
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
      store: useAppStore(),
      meetings: rooms,
    };
  },

  props: {
    view: String,
  },

  computed: {
    isTeacher() {
      return this.store.isTeacher;
    },
    isStudent() {
      return this.store.isStudent || this.store.isAlumni;
    },
    isStudentView() {
      return this.view === "student";
    },
    className() {
      return this.store.currentClassName;
    },
    isPartTime() {
      return this.store.isPartTimeStudent;
    },
    zoomRooms() {
      if (this.isPartTime) return;
      const currentClass = this.className;

      return this.meetings.find(function (meeting) {
        return meeting.slug === currentClass;
      });
    },
  },
};
</script>
