<template>
  <section>
    <PageHeader title="Hello Guest 👋" sub="You only have guest permissions." />
    <div class="guest">
      <article>
        <h3>You are a new student</h3>
        <p>
          If you are a new student, we will give you the right permissions soon.
        </p>
      </article>
      <article>
        <h3>You are an existing student</h3>
        <p>
          If you are an existing student and suddenly see this page: Oh no, it
          seems something went wrong (and it's probably not even your fault).
          After you've finished panicking, please contact your teacher so the
          issue can be resolved.
        </p>
      </article>
    </div>
  </section>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
export default {
  name: "Guest",
  components: {
    PageHeader,
  },
  mounted() {
    // When a user has only guest permissions
    // it may happens that we give permissions
    // and they reload the /guest route
    // then the new permissions are loaded but they
    // remain here... this is the fix 😘
    /*     if (this.$store.getters.isGuest !== true) {
      this.$router.push("/");
    } */
  },
};
</script>
<style scoped>
article {
  background-color: var(--clr-accent-light);

  padding: var(--s-base);
  border-radius: var(--radius-outer);
}

article:has(+ article) {
  margin-bottom: var(--s-base);
}

h3 {
  color: var(--clr-accent);

  margin-block: var(--s-base);
}

p {
  line-height: 1.8;
}
</style>
