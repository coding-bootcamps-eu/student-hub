<template>
  <section>
    <div>
      <div>
        <LoginForm />
      </div>
      <p>
        Um den Student Hub nutzen zu können, musst du eingeloggt und
        freigeschaltet sein.
      </p>
    </div>
  </section>
</template>

<script setup>
import LoginForm from "@/components/Login/LoginForm.vue";
import PageHeader from "@/components/Layout/Header/PageHeader.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
</script>
