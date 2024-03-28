<template>
  <nav class="header-nav__container">
    <label for="toggle-menu" class="toggle-menu__icon-container">
      <span v-show="!showNavigation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="toggle-menu__icon"
          viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
        </svg>
      </span>
      <span v-show="showNavigation">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="toggle-menu__icon"
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
      class="toggle-menu__handle"
      v-model="showNavigation" />

    <menu class="header-nav__list" :class="isShown">
      <template v-if="isLoggedIn">
        <template v-if="!this.$store.getters.isGuest">
          <li class="header-nav__item">
            <router-link to="/">Lobby</router-link>
          </li>
          <li v-if="isTeacher" class="header-nav__item-header"></li>
          <li class="header-nav__item" v-if="isTeacher">
            <router-link to="/students">Students</router-link>
          </li>
          <li class="header-nav__item">
            <router-link to="/recordings">Recordings</router-link>
          </li>
          <li v-if="isTeacher" class="header-nav__item-header"></li>
          <li class="header-nav__item">
            <router-link to="/schedule">Schedule</router-link>
          </li>
          <li class="header-nav__item">
            <router-link to="/zoom">Zoom Rooms</router-link>
          </li>
          <li class="header-nav__item">
            <router-link to="/slides">Slides</router-link>
          </li>
          <li class="header-nav__item">
            <a
              href="https://form.asana.com/?k=msqPDRYEAxA8uspT_xcYbw&d=1181024715195521"
              target="_blank"
              style="display: flex; align-items: baseline; gap: var(--s-base)"
              >Report absence
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-up-right"
                viewBox="0 0 16 16">
                <path
                  fill-rule="evenodd"
                  d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                <path
                  fill-rule="evenodd"
                  d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
              </svg>
            </a>
          </li>
        </template>
        <li class="header-nav__item">
          <router-link to="/logout">Logout</router-link>
        </li>
      </template>
      <template v-else>
        <li class="header-nav__item">
          <router-link to="/login">Login</router-link>
        </li>
      </template>
    </menu>
  </nav>
</template>
<script>
export default {
  data: () => {
    return {
      runOnce: false,
      showNavigation: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },

    isShown() {
      return {
        shown: this.showNavigation,
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
