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
import { fullTimeSchedule, partTimeSchedule } from "../schedule/schedule.js";
import { useAppStore } from "../stores/app.js";
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

<style scoped>
.schedule {
  container-type: inline-size;
  container-name: content;
}

.tabs__container {
  margin-block: 1rem;

  display: flex;
  gap: 1rem;
}

.schedule-list {
  --columns: 1;

  list-style-type: none;
  padding: 0;

  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  align-items: start;
  gap: 1rem;
}

.module-card {
  background-color: var(--clr-accent);
  color: white;

  padding: 1rem;
}

.module-card * {
  margin: 0;
}

.module__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-accordeon {
  width: var(--s-medium);
}

.categories {
  list-style-type: none;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  margin-block: 1rem;
  padding-left: 0;
}

.category {
  background-color: var(--clr-accent-light);

  padding: 0.5rem;
}

.category-title {
  color: var(--clr-accent);
  font-size: 115%;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.category-links {
  display: flex;
  gap: 1rem;
}

.category-link {
  font-size: 85%;
  color: black;

  text-decoration: underline;
  text-underline-offset: 0.25rem;
  text-decoration-thickness: 1px;
}

th[scope="row"] {
  width: 40%;
}

thead > tr > th:not(:first-child) {
  text-align: center;
}

td {
  text-align: center;
  margin-inline: auto;
}

@container content (min-width: 768px) {
  .schedule-list {
    --columns: 2;
  }
}
</style>
