<template>
  <section>
    <header class="page-heading">
      <p class="page-heading__subtitle">
        Hello, {{ this.$store.getters.userName }} - Let's go!
      </p>
    </header>
    <div class="student-wrapper" v-if="isStudent">
      <StudentItems />
    </div>
    <div class="teacher-wrapper" v-if="isTeacher">
      <form class="view-wrapper" @change="selectedView = $event.target.value">
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
        />
        <label for="student-view" class="tab-text">Student</label>
      </form>
      <AdminItems v-if="selectedView === 'teacher'" />
      <StudentItems v-if="selectedView === 'student'" />
    </div>
  </section>
</template>

<script>
import StudentItems from "@/components/Lobby/StudentItems.vue";
import AdminItems from "@/components/Lobby/AdminItems.vue";
export default {
  name: "Home",
  data() {
    return {
      selectedView: "teacher",
    };
  },
  components: {
    StudentItems,
    AdminItems,
  },
  computed: {
    isStudent() {
      return this.$store.getters.isStudent || this.$store.getters.isAlumni;
    },
    isTeacher() {
      return this.$store.getters.isTeacher;
    },
  },
};
</script>

<style>
.view-wrapper {
  margin-block: 1rem;

  display: flex;
  gap: 1rem;
}

.home__nav {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  justify-content: center;
}

.home__link {
  background: #e5e5e5;
  box-shadow: 1px 1px 9px 1px #c4c4c4;
  border-radius: 5px;
  padding: 1rem 3rem;
  color: #292929;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home__link:hover {
  background-color: #595959;
  color: #ffffff;
}

.home__link > svg {
  color: rgba(38, 38, 38, 0.4);
  width: 2rem;
  margin-bottom: 1rem;
}

.home__link:hover > svg {
  color: rgba(242, 242, 242, 0.57);
}
</style>
