<template>
  <header class="page-heading">
    <h2 class="page-heading__title">Logbook</h2>
    <p class="page-heading__subtitle">Logbook for your bootcamp success</p>
  </header>
  <div v-if="this.$store.getters.canUseLogBook">
    <p>Füllt die Formulare während des Checkin und Checkout gemeinsam aus.</p>
    <p>
      Trefft euch nach der Live-Session im Discord und füllt gemeinsam das
      Formular aus.
    </p>
    <h3 v-if="this.$store.getters.isTeacher">September 2022</h3>
    <ul
      v-if="
        this.$store.getters.isTeacher ||
        this.$store.state.className === '2022-09'
      "
    >
      <li>
        <a
          href="https://forms.gle/asCvVfgoLnbh1xN97"
          target="_blank"
          rel="noopener noreferrer"
          >Logbook Checkin</a
        >
      </li>
      <li>
        <a
          href="https://forms.gle/Nm71NjP5bccDf7Ek7"
          target="_blank"
          rel="noopener noreferrer"
          >Logbook Live-Session</a
        >
      </li>
      <li>
        <a
          href="https://forms.gle/UAxyi4WQDgA9oEUB9"
          target="_blank"
          rel="noopener noreferrer"
          >Logbook Checkout</a
        >
      </li>
    </ul>
    <h3 v-if="this.$store.getters.isTeacher">Oktober 2022</h3>
    <ul
      v-if="
        this.$store.getters.isTeacher ||
        this.$store.state.className === '2022-10'
      "
    >
      <li>
        <a
          href="https://forms.gle/eormM5qbkuBpiUhE8"
          target="_blank"
          rel="noopener noreferrer"
          >Logbook Checkin</a
        >
      </li>
      <li>
        <a
          href="https://forms.gle/3UzPhJHcnv2w5MkL7"
          target="_blank"
          rel="noopener noreferrer"
          >Logbook Live-Session</a
        >
      </li>
      <li>
        <a
          href="https://forms.gle/QgBHA1QjoviM9eeF6"
          target="_blank"
          rel="noopener noreferrer"
          >Logbook Checkout</a
        >
      </li>
    </ul>
  </div>
  <div v-else>
    <p>Du hast leider keine Berechtigung für das Logbook.</p>
  </div>
</template>
<script>
export default {
  name: "Logbook",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="css" scoped>
a {
  color: initial;
  text-decoration: underline;
  cursor: pointer;
}
</style>
