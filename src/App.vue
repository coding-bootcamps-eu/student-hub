<template>
  <header class="header">
    <div class="header__nav-button-wrapper">
      <button
        class="header__nav-button"
        @click="hideNavigation = !hideNavigation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
    </div>
    <nav class="header__nav" :class="{ 'header__nav--closed': hideNavigation }">
      <ul class="header__nav-list">
        <li class="header__nav-item">
          <router-link to="/recordings">Recordings</router-link>
        </li>
        <li class="header__nav-item">
          <router-link to="/timer">Timer</router-link>
        </li>
        <li class="header__nav-item">
          <router-link to="/students">Students</router-link>
        </li>
        <li class="header__nav-item">
          <router-link to="/slides">Slides</router-link>
        </li>
        <li class="header__nav-item">
          <router-link to="/logout">Logout</router-link>
        </li>
      </ul>
    </nav>
    <div class="header__content">
      <h1 class="header__title">CODING BOOTCAMPS EUROPE</h1>
    </div>
  </header>
  <main>
    <router-view />
  </main>
  <CBEMainFooter />
</template>

<script>
import { getAuth } from "firebase/auth";

import CBEMainFooter from "@/components/CBEMainFooter/CBEMainFooter.vue";
import CBEMainHeader from "@/components/CBEMainHeader/CBEMainHeader.vue";
import CBEMainNavigation from "@/components/CBEMainNavigation/CBEMainNavigation.vue";

export default {
  name: "App",
  data: () => {
    return {
      hideNavigation: true,
    };
  },
  components: {
    CBEMainNavigation,
    CBEMainHeader,
    CBEMainFooter,
  },
  created() {
    // Check if user is already logged in
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("login", user);
      }
    });
  },
  watch: {
    $route() {
      this.hideNavigation = true;
    },
  },
};
</script>

<style lang="css">
.header {
  color: #ffffff;
  background-color: #262626;
  position: relative;
  border-radius: 0 0 1rem 1rem;
}

.header__content {
  padding: 0 2rem;
  padding-bottom: 1rem;
}

.header__title {
  text-align: center;
  font-size: 1.2rem;
}

.header__nav-button-wrapper {
  position: relative;
  padding: 1rem 2rem;
  z-index: 1;
  background-color: #262626;
}

.header__nav-button {
  all: unset;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
}

.header__nav {
  position: absolute;
  width: 100%;
  left: 0;
  background-color: #262626;
  padding-bottom: 2rem;
  border-radius: 0 0 1rem 1rem;
  transform: translateY(0%);
  transition: transform 0.5s;
}

.header__nav--closed {
  transform: translateY(-100%);
}

.header__nav-list {
  list-style-type: none;
  padding: 0 2rem;
}

.header__nav-item {
  border-bottom: 2px solid #fff;
  padding-bottom: 0.5rem;
}

.header__nav-item + .header__nav-item {
  margin-top: 1rem;
}

a {
  color: white;
  text-decoration: none;
}
</style>
