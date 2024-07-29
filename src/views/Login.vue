<template>
  <section>
    <div class="login-container">

      <div class="login">
        <GitHubIcon color="white" class="icon" />
        <CBELogin />
      </div>
      <p class="login__hint">
        Um den Student Hub nutzen zu können, musst du eingeloggt und freigeschaltet sein.
      </p>
    </div>
  </section>
</template>

<script>
import CBELogin from "@/components/CBELogin/CBELogin.vue";
import PageHeader from "@/components/PageHeader.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";

export default {
  name: "Login",
  components: { CBELogin, PageHeader, GitHubIcon },
};
</script>

<style scoped>
.login-container {
  padding: 1rem;
  border: 2px solid var(--clr-accent);
  border-radius: var(--radius-outer);

  display: flex;
  gap: 2rem;
  align-items: center;
}

.icon {
  width: 4rem;
}

.login {
  background-color: var(--clr-accent);

  width: fit-content;
  padding: 2rem;
  margin-inline: auto;
  border-radius: var(--radius-inner);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.login__hint {
  color: var(--clr-accent);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.8;
}

@media screen and (min-width: 768px) {
  section {
    height: 100%;

    display: grid;
    place-items: center;
  }
}
</style>
