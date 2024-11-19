<template>
  <nav>
    <label for="toggle-menu" class="">
      <span
        v-show="!showNavigation"
        class="md:hidden relative z-50 text-violet-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="w-8"
          viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
        </svg>
      </span>
      <span
        v-show="showNavigation"
        class="md:hidden relative z-50 text-violet-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="w-8"
          viewBox="0 0 16 16">
          <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
        </svg>
      </span>
      <span class="sr-only" v-show="showNavigation">Hide Navigation</span>
      <span class="sr-only" v-show="!showNavigation">Show Navigation</span>
    </label>
    <input
      type="checkbox"
      name="toggle-menu"
      id="toggle-menu"
      class="absolute top-[-1000%] md:hidden"
      v-model="showNavigation" />

    <menu
      class="
        w-full
        absolute
        bg-violet-700
        top-full
        inset-x-0
        flex flex-col
        items-center
        justify-between
        gap-2
        py-24
        text-violet-100
        z-10
        text-xl
        md:flex
        md:flex-row
        md:justify-end
        md:gap-8
        md:static
        md:bg-transparent
        md:py-0
      "
      :class="isHidden">
      <template v-if="isLoggedIn">
        <hr />
        <li>
          <router-link
            to="/logout"
            class="bg-violet-100 text-violet-700 p-2 rounded"
            >Ausloggen</router-link
          >
        </li>
      </template>
      <template v-else>
        <li>
          <router-link to="/login">Einloggen</router-link>
        </li>
      </template>
      <li>
        <MainFooter />
      </li>
    </menu>
  </nav>
</template>
<script>
import LinkIcon from "@/components/icons/LinkIcon.vue";
import MainFooter from "../MainFooter.vue";

export default {
  components: {
    LinkIcon,
    MainFooter,
  },

  data() {
    return {
      runOnce: false,
      showNavigation: false,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    isHidden() {
      return {
        hidden: !this.showNavigation,
      };
    },

    isTeacher() {
      return this.$store.getters.isTeacher;
    },
  },

  watch: {
    $route() {
      this.showNavigation = false;
    },
  },
};
</script>
