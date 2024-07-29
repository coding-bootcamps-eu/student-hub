<template>
  <PageHeader title="Module" sub="Hier bekommst du eine Übersicht darüber, wie unser Bootcamp aufgebaut ist" />
  <div class="schedule">
    <form class="tabs__container">
      <div class="tab-wrapper" v-for="className in classes" :key="className">
        <input type="radio" :id="className" name="class-tab" :value="className" v-model="selectedClass" class="tab"
          @change="selectedClass = className" />
        <label :for="className" class="tab-text">
          {{ className }}
        </label>
      </div>
    </form>
    <div v-if="!isMobile">
      <table v-for="module in selectedSchedule" :key="module.title">
        <thead>
          <tr>
            <th scope="col" style="font-size: 1.5rem; width: 100%;">
              {{ module.title }} (Dauer: {{ module.length }})
            </th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category of module.categories" :key="category">
            <th scope="row">{{ category.title }}</th>
            <td>
              <AccentButton v-if="category.videos" title="Videos" :to="category.videos" style="margin-inline: auto">
                <PlayIcon color="white" />
              </AccentButton>
            </td>
            <td>
              <AccentButton v-if="category.tasks" title="Tasks" :to="category.tasks" style="margin-inline: auto">
                <TaskIcon color="white" />
              </AccentButton>
            </td>
            <td>
              <AccentButton v-if="category.slides" title="Slides" :to="category.slides" style="margin-inline: auto">
                <SlideIcon color="white" />
              </AccentButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
import PlayIcon from "@/components/icons/PlayIcon.vue";
import TaskIcon from "@/components/icons/TaskIcon.vue";
import SlideIcon from "@/components/icons/SlideIcon.vue";
import AccentButton from "@/components/AccentButton.vue";
import { fullTimeSchedule, partTimeSchedule } from "../schedule/schedule.js";
export default {
  name: "Schedule",
  components: {
    PageHeader,
    PlayIcon,
    TaskIcon,
    SlideIcon,
    AccentButton
  },

  data() {
    return {
      selectedClass: "",
      classes: ["Vollzeit", "Teilzeit"],
      fullTimeSchedule: fullTimeSchedule,
      partTimeSchedule: partTimeSchedule,
      screenSize: 0,
    };
  },
  mounted() {
    if (this.$store.state.fulltime) {
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

thead>tr>th:not(:first-child) {
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
