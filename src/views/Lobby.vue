<template>
  <section>
    <header class="page-heading">
      <p class="page-heading__subtitle">
        Hello, {{ this.$store.getters.userName }} - Let's go!
      </p>
    </header>
    <form
      class="view-wrapper"
      @change="selectedView = $event.target.value"
      v-if="isTeacher"
    >
      <span>Choose a layout: </span>
      <input
        type="radio"
        name="view"
        id="teacher-view"
        value="teacher"
        v-model="selectedView"
        class="tab"
      />
      <label for="teacher-view" class="tab-text">Teacher</label>
      <input
        type="radio"
        name="view"
        id="student-view"
        class="tab"
        value="student"
        v-model="selectedView"
      />
      <label for="student-view" class="tab-text">Student</label>
    </form>
    <ItemsGrid :view="selectedView" />
  </section>
</template>

<script>
import ItemsGrid from "@/components/Lobby/ItemsGrid.vue";
export default {
  name: "Home",
  data() {
    return {
      selectedView: "teacher",
    };
  },
  components: {
    ItemsGrid,
  },
  computed: {
    isTeacher() {
      return this.$store.getters.isTeacher;
    },
  },
};
</script>

<style scoped>
.view-wrapper {
  margin-block: 1rem;

  display: flex;
  gap: 1rem;
}
</style>
