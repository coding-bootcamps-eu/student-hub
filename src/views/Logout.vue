<template>
  <section>
    <p>
      Du bist ausgeloggt. Bitte logge dich wieder ein, falls du die Funktionen
      des Tools nutzen möchtest.
    </p>
    <CBELogin />
  </section>
</template>

<script>
import CBELogin from "@/components/CBELogin/CBELogin.vue";
export default {
  name: "LoggedOut",
  components: {
    CBELogin,
  },
};
</script>
