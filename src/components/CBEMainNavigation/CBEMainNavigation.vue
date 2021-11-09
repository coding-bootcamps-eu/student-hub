<template>
  <nav class="cbe__main-nav" v-if="!mobileNavigation">
    <ul
      class="cbe__nav-list"
      v-if="!isGuest && this.$store.getters.getUserLoginState"
    >
      <li class="cbe__nav-element" v-if="isStudent">
        <router-link
          :to="{
            name: 'Student-Profile',
            params: {
              studentKey: this.$store.getters.getCurrentUserID,
            },
          }"
          ><p class="link-text">Profile</p>
          <i class="fas fa-user-circle"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element" v-if="isTeacher">
        <router-link to="/teacherhub"
          ><p class="link-text">Teacher</p>
          <i class="fas fa-school"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/amaview"
          ><p class="link-text">AMA</p>
          <i class="fas fa-question-circle"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/rotitool"
          ><p class="link-text">ROTI</p>
          <i class="fas fa-clock"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <router-link to="/lessonrecordings"
          ><p class="link-text">Recordings</p>
          <i class="fas fa-video"></i
        ></router-link>
      </li>
      <li class="cbe__nav-element">
        <CBEUserLogin />
      </li>
    </ul>
  </nav>
</template>
<script>
import CBEUserLogin from "@/components/CBEUserLogin/CBEUserLogin.vue";

export default {
  name: "CBEMainNavigation",
  components: {
    CBEUserLogin,
  },
  data() {
    return {
      mobileNavigation: window.matchMedia(screen && "(max-width:555px)")
        .matches,
    };
  },
  created() {
    window.addEventListener("resize", this.checkMobileNavigation);
  },
  methods: {
    checkMobileNavigation() {
      this.mobileNavigation = window.matchMedia(
        screen && "(max-width:555px)"
      ).matches;
    },
  },
  computed: {
    isTeacher() {
      return this.$store.getters.getCurrentUserRole === "teacher"
        ? true
        : false;
    },
    isGuest() {
      return this.$store.getters.getCurrentUserRole === "guest" ||
        this.$store.getters.getCurrentUserRole === "null"
        ? true
        : false;
    },
    isStudent() {
      return this.$store.getters.getCurrentUserRole === "student"
        ? true
        : false;
    },
  },
};
</script>
<style lang="scss" scoped>
nav {
  .link-text {
    margin: 0;
    padding: 0;
  }
  .cbe__nav-list {
    margin: 1rem 4rem 1rem 2.5rem;
    padding: 0rem 2rem 1rem 0rem;
    height: 100%;
    display: flex;
    flex-flow: row;
    list-style-type: none;
    align-items: baseline;
    white-space: nowrap;
    border-bottom: 0.5px solid var(--primary-color);
  }
  li a {
    color: black;
    text-decoration: none;
    padding: 0.5rem;
    margin-right: 1rem;
    border: 0.5px solid var(--primary-color);
    border-radius: 0.25rem;
    display: flex;
    flex-flow: row;
    align-items: center;
    i {
      margin-left: 0.4rem;
      color: var(--secondary-color);
      font-size: 1.2em;
    }
    &.router-link-active {
      border: 2.5px solid var(--primary-color);
      border-radius: 0.25rem;
    }
    &:focus {
      outline: none;
      border: 2.5px solid var(--success-color);
      border-radius: 0.25rem;
    }
  }
}
@media only screen and (max-width: 840px) {
  nav {
    font-size: 0.9em;
  }
}
@media only screen and (max-width: 800px) {
  nav {
    .cbe__nav-list > * {
      font-size: 0.8em;
    }
  }
}
@media only screen and (max-width: 720px) {
  i {
    color: var(--secondary-color);
    font-size: 1.2em;
    margin-right: 0.4rem;
  }
  .link-text {
    display: none;
  }
  nav {
    .cbe__nav-list {
      _margin: 1rem 2rem 1rem 2.5rem;
      padding: 0.5em 0;
    }
  }
}

@media screen and (max-width: 555px) {
  i {
    color: black;
  }
}
</style>
