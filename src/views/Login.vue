<template>
  <section>
    <div class="login-container">
      <div class="login">
        <GitHubIcon color="white" class="icon" />
        <LoginForm />
      </div>
      <p class="login__hint">
        Um den Student Hub nutzen zu können, musst du eingeloggt und
        freigeschaltet sein.
      </p>
    </div>
  </section>
</template>

<script>
import LoginForm from "@/components/Login/LoginForm.vue";
import PageHeader from "@/components/PageHeader.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";

export default {
  name: "Login",
  components: { LoginForm, PageHeader, GitHubIcon },
};
</script>
