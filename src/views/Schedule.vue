<template>
  <header class="page-heading">
    <h2 class="page-heading__title">Schedule</h2>
  </header>
  <div class="schedule">
    <div>
      <p>Select a class to see its schedule:</p>
      <form class="tabs">
        <div class="tab-wrapper" v-for="className in classes" :key="className">
          <input
            type="radio"
            :id="className"
            name="class-tab"
            :value="className"
            v-model="selectedClass"
          />
          <label :for="className">
            {{ className }}
          </label>
        </div>
      </form>
    </div>
    <ul class="schedule-list">
      <li
        class="module-card"
        v-for="module in selectedSchedule"
        :key="module.title"
      >
        <h3 class="module-title">{{ module.title }}</h3>
        <p class="module-length">Length: {{ module.length }}</p>
        <ul class="categories">
          <li
            class="category"
            v-for="category of module.categories"
            :key="category"
          >
            <p class="category-title">{{ category.title }}</p>
            <div class="category-links">
              <a
                :href="category.videos"
                v-if="category.videos"
                class="category-link"
                >Videos</a
              >
              <a
                :href="category.tasks"
                v-if="category.tasks"
                class="category-link"
                >Tasks</a
              >
              <a
                :href="category.slides"
                v-if="category.slides"
                class="category-link"
                >Slides</a
              >
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { fullTimeSchedule, partTimeSchedule } from "../schedule/schedule.js";
export default {
  name: "Schedule",
  data() {
    return {
      selectedClass: "Vollzeit",
      classes: ["Vollzeit", "Teilzeit"],
      fullTimeSchedule: fullTimeSchedule,
      partTimeSchedule: partTimeSchedule,
    };
  },
  created() {
    if (this.$store.state.isFullTimeStudent) {
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
.tabs {
  margin-block: 1rem;

  display: flex;
  gap: 1rem;
}

.tab-wrapper input[type="radio"] {
  all: unset;
  position: absolute;
}

.tab-wrapper label {
  cursor: pointer;

  border: 2px solid black;
  border-radius: 4px;
  padding: 0.25rem 0.75rem;
}

.tab-wrapper input:checked + label {
  background-color: #262626;
  color: white;
}

.tab-wrapper input:focus + label {
  outline: 2px solid #999999;
  outline-offset: 2px;
}

.tab-wrapper input:hover + label {
  background-color: #999;
}

.schedule-list {
  list-style-type: none;
  padding: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
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
</style>
