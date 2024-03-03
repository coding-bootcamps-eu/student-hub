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
    <ul class="schedule-list">
      <li
        class="module-card card card-accent"
        v-for="module in selectedSchedule"
        :key="module.title"
      >
        <header class="module__header">
          <div class="module__header-content">
            <h3 class="module-title">{{ module.title }}</h3>
            <p class="module-length">Length: {{ module.length }}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="toggle-accordeon"
            viewBox="0 0 16 16"
            v-if="!module.isShown"
            @click="module.isShown = !module.isShown"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="toggle-accordeon"
            viewBox="0 0 16 16"
            v-if="module.isShown"
            @click="module.isShown = !module.isShown"
          >
            <path
              fill-rule="evenodd"
              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
            />
          </svg>
        </header>
        <ul class="categories" v-show="module.isShown">
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
  methods: {
    toggleAccordeon() {},
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

@container content (min-width: 768px) {
  .schedule-list {
    --columns: 2;
  }
}
</style>
