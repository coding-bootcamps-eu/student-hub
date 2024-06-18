<template>
  <PageHeader title="Schedule" />
  <div class="schedule">
    <form class="tabs__container">
      <div class="tab-wrapper" v-for="className in classes" :key="className">
        <input
          type="radio"
          :id="className"
          name="class-tab"
          :value="className"
          v-model="selectedClass"
          class="tab"
          @change="selectedClass = className"
        />
        <label :for="className" class="tab-text">
          {{ className }}
        </label>
      </div>
    </form>
    <div v-if="!isMobile">
      <table v-for="module in selectedSchedule" :key="module.title">
        <thead>
          <tr>
            <th scope="col">
              {{ module.title }} (Length: {{ module.length }})
            </th>
            <th scope="col">Slides</th>
            <th scope="col">Tasks</th>
            <th scope="col">Slides</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category of module.categories" :key="category">
            <th scope="row">{{ category.title }}</th>
            <td>
              <a :href="category.videos" v-if="category.videos">Videos</a>
            </td>
            <td>
              <a :href="category.tasks" v-if="category.tasks">Tasks</a>
            </td>
            <td>
              <a :href="category.slides" v-if="category.slides">Slides</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
import { fullTimeSchedule, partTimeSchedule } from "../schedule/schedule.js";
export default {
  name: "Schedule",
  components: {
    PageHeader,
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

table a {
  background-color: var(--clr-accent);
  color: white;
  text-decoration: none;

  padding: var(--s-xs) calc(var(--s-xs) * 3);
  border-radius: var(--radius-inner);
}

thead > tr > th:not(:first-child) {
  text-align: center;
}

td {
  text-align: center;
}

@container content (min-width: 768px) {
  .schedule-list {
    --columns: 2;
  }
}
</style>
