<template>
  <section>
    <div class="home__wrapper">
      <h2 class="home__welcome-heading">Willkommen bei Coding-Bootcamps-EU!</h2>
      <p class="home__welcome-message-loggedOut" v-if="!isUserLoggedIn">
        Bitte logge dich mit deinem GitHub Profil ein um dieses Tool nutzen zu
        können!
      </p>
      <p v-else-if="isGuest">
        Du bist noch ein Gast. Bitte melde dich bei den Teachern, damit Sie dich
        als Student*in freischalten können.
      </p>
      <p class="home__welcome-message-loggedIn" v-else-if="isUserLoggedIn">
        Du bist nun eingeloggt und kannst alle Funktionen nutzen. Viel Spaß!
      </p>

      <CBELogin />
    </div>
  </section>
</template>

<script>
import CBELogin from "@/components/CBELogin/CBELogin.vue";

export default {
  name: "Home",
  components: { CBELogin },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.getUserLoginState ? true : false;
    },
    isGuest() {
      return this.$store.getters.getCurrentUserRole === "guest" ? true : false;
    },
  },
};
</script>
