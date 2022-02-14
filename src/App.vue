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
      <div class="header__timer" v-if="this.$store.getters.hasTimer">
        <template v-if="this.$store.state.timerType === 'pause'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cup-straw"
            viewBox="0 0 16 16"
          >
            <path
              d="M13.902.334a.5.5 0 0 1-.28.65l-2.254.902-.4 1.927c.376.095.715.215.972.367.228.135.56.396.56.82 0 .046-.004.09-.011.132l-.962 9.068a1.28 1.28 0 0 1-.524.93c-.488.34-1.494.87-3.01.87-1.516 0-2.522-.53-3.01-.87a1.28 1.28 0 0 1-.524-.93L3.51 5.132A.78.78 0 0 1 3.5 5c0-.424.332-.685.56-.82.262-.154.607-.276.99-.372C5.824 3.614 6.867 3.5 8 3.5c.712 0 1.389.045 1.985.127l.464-2.215a.5.5 0 0 1 .303-.356l2.5-1a.5.5 0 0 1 .65.278zM9.768 4.607A13.991 13.991 0 0 0 8 4.5c-1.076 0-2.033.11-2.707.278A3.284 3.284 0 0 0 4.645 5c.146.073.362.15.648.222C5.967 5.39 6.924 5.5 8 5.5c.571 0 1.109-.03 1.588-.085l.18-.808zm.292 1.756C9.445 6.45 8.742 6.5 8 6.5c-1.133 0-2.176-.114-2.95-.308a5.514 5.514 0 0 1-.435-.127l.838 8.03c.013.121.06.186.102.215.357.249 1.168.69 2.438.69 1.27 0 2.081-.441 2.438-.69.042-.029.09-.094.102-.215l.852-8.03a5.517 5.517 0 0 1-.435.127 8.88 8.88 0 0 1-.89.17zM4.467 4.884s.003.002.005.006l-.005-.006zm7.066 0-.005.006c.002-.004.005-.006.005-.006zM11.354 5a3.174 3.174 0 0 0-.604-.21l-.099.445.055-.013c.286-.072.502-.149.648-.222z"
            />
          </svg>
        </template>
        <template v-if="this.$store.state.timerType === 'work'">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-briefcase"
            viewBox="0 0 16 16"
          >
            <path
              d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </template>
        {{ this.$store.getters.timer }}
      </div>
    </div>
    <nav class="header__nav" :class="{ 'header__nav--closed': hideNavigation }">
      <ul class="header__nav-list">
        <template v-if="isLoggedIn">
          <template v-if="!this.$store.getters.isGuest">
            <li class="header__nav-item">
              <router-link to="/">Home</router-link>
            </li>
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
          </template>
          <li class="header__nav-item">
            <router-link to="/logout">Logout</router-link>
          </li>
        </template>
        <template v-else>
          <li class="header__nav-item">
            <router-link to="/login">Login</router-link>
          </li>
        </template>
      </ul>
    </nav>
    <div class="header__content">
      <h1 class="header__title">CODING BOOTCAMPS EUROPE</h1>
    </div>
  </header>
  <main class="main">
    <router-view />
  </main>
  <CBEMainFooter />
</template>

<script>
import CBEMainFooter from "@/components/CBEMainFooter/CBEMainFooter.vue";

export default {
  name: "App",
  data: () => {
    return {
      runOnce: false,
      hideNavigation: true,
    };
  },
  components: {
    CBEMainFooter,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
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
  display: flex;
  justify-content: space-between;
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

.header__timer {
  display: flex;
  align-items: center;
}

.header__timer > svg {
  margin-right: 0.25rem;
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

.main {
  padding: 2rem;
}
</style>
