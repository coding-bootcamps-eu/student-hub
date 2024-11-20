<template>
  <header>
    <h2
      class="
        text-violet-700 text-xs
        py-1
        px-3
        md:text-base md:py-2 md:px-6
        rounded
      ">
      {{ title }}
    </h2>
  </header>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>
