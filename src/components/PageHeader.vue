<template>
  <header>
    <h2
      class="
        text-violet-700
        bg-violet-200
        text-xs
        py-1
        px-3
        md:text-2xl md:py-2 md:px-6
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
