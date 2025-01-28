<template>
  <div class="schedule md:flex md:flex-wrap md:gap-14">
    <article
      v-for="(module, i) in selectedSchedule"
      :key="module.title"
      class="mb-14 md:mb-0">
      <header>
        <h3 class="font-bold text-violet-700">
          {{ i + 1 + ". " + module.title }} (Dauer: {{ module.length }})
        </h3>
      </header>
      <section
        v-for="category of module.categories"
        :key="category"
        class="mb-4 border-b-2 py-2">
        <h4 class="mb-2">{{ category.title }}</h4>
        <div class="flex text-xs gap-2">
          <AccentButton
            v-if="category.videos"
            title="Videos"
            :to="category.videos">
            <PlayIcon />
          </AccentButton>
          <AccentButton
            v-if="category.tasks"
            title="Tasks"
            :to="category.tasks">
            <TaskIcon />
          </AccentButton>
          <AccentButton
            v-if="category.slides"
            title="Slides"
            :to="category.slides">
            <SlideIcon />
          </AccentButton>
        </div>
      </section>
    </article>
  </div>
</template>
<script>
import PlayIcon from "@/components/icons/PlayIcon.vue";
import TaskIcon from "@/components/icons/TaskIcon.vue";
import SlideIcon from "@/components/icons/SlideIcon.vue";
import AccentButton from "@/components/AccentButton.vue";

import { fullTimeSchedule, partTimeSchedule } from "@/schedule/schedule.js";
import { useAppStore } from "@/stores/app.js";

export default {
  components: {
    PlayIcon,
    TaskIcon,
    SlideIcon,
    AccentButton,
  },

  data() {
    return {
      store: useAppStore(),
      selectedClass: "",
      classes: ["Vollzeit", "Teilzeit"],
      fullTimeSchedule: fullTimeSchedule,
      partTimeSchedule: partTimeSchedule,
      screenSize: 0,
    };
  },

  mounted() {
    if (this.store.fulltime) {
      this.selectedClass = "Vollzeit";
    } else {
      this.selectedClass = "Teilzeit";
    }
  },

  computed: {
    selectedSchedule() {
      if (this.selectedClass === "Teilzeit") {
        return this.partTimeSchedule;
      } else {
        return this.fullTimeSchedule;
      }
    },
  },
};
</script>
