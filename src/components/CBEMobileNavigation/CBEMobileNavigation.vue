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
      mobileNavigation: window.matchMedia(screen && "(max-width:720px)")
        .matches,
    };
  },
  created() {
    window.addEventListener("resize", this.checkMobileNavigation);
  },
  methods: {
    checkMobileNavigation() {
      this.mobileNavigation = window.matchMedia(
        screen && "(max-width:720px)"
      ).matches;
    },
  },
};
</script>
