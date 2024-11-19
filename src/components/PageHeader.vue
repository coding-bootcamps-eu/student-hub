<template>
  <header class="pb-4 mb-4 border-b-2">
    <h2 class="text-violet-700 font-bold text-xl">{{ title }}</h2>
    <p class="text-violet-400 text-xs" v-if="sub">{{ sub }}</p>
  </header>
</template>

<script>
export default {
  props: {
    title: String,
    sub: String,
  },
};
</script>
