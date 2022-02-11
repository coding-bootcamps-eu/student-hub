<template>
  <div>
    <p>Hallo</p>
    <div v-if="this.$store.state.isLoggedIn">
      {{ this.$store.state.currentUser }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
