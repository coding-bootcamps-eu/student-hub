<template>
  <nav class="cbe__mobile-nav" v-if="mobileNavigation">
    <img
      class="header-logo"
      alt="Coding Bootcamp Europe Logo"
      src="@/assets/cbe-logo-plain.png"
    />
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
  components: { CBEUserLogin },
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
.cbe__mobile-nav > * {
  margin: 0 auto;
}
.header-logo {
  max-width: 3rem;
  padding: 0.25rem;
  margin-top: 0.5rem;
}
.cbe__nav-list {
  all: unset;
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100%;
  li:last-child {
    margin-top: 2rem;
  }
}
.cbe__mobile-nav {
  display: block;
  z-index: 1;
  width: 4rem;
  height: 100%;
  position: fixed;
  background-color: whitesmoke;
  transition: 400ms ease-in-out;
  box-shadow: var(--primary-color) 0px 0.5px 1.5px,
    rgba(0, 0, 0, 0.24) 0px 0.5px 1px;
  .link-text {
    display: none;
    transition: 0.05s ease-in-out;
  }
  .cbe__nav-element {
    max-width: 95%;
    min-width: 2.5rem;
    margin: 1.5rem 0.125rem;
    transition: max-width 400ms ease-in-out;
    &:hover {
      width: 100%;
    }
    a {
      color: var(--primary-color);
      margin: 0;
      transition: 400ms ease-in-out;
      i {
        color: var(--primary-color);
      }
      &:hover {
        i {
          color: var(--secondary-color);
        }
      }
    }
  }
}

.cbe__mobile-nav:hover {
  width: 12rem;
  .link-text {
    display: block;
    justify-content: baseline;
    align-items: baseline;
  }
  .cbe__nav-element {
    min-width: 95%;
    margin: 0.5rem;
    padding: 0.25rem;
    a {
      border-radius: 0.25rem;
      border: 0.5px solid var(--secondary-color);
      color: var(--primary-color);
      text-decoration: none;
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: baseline;
      padding: 0.5rem 1rem;
      .link-text {
        margin: 0;
      }
    }
  }
}
</style>
