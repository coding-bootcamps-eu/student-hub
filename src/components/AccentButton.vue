<template>
  <a
    :href="to"
    target="_blank"
    class="
      py-2
      px-6
      bg-violet-300
      flex
      items-center
      gap-2
      w-fit
      rounded-sm
      text-violet-700
      font-bold
    ">
    <slot class="test" />
    <span>
      {{ title }}
    </span>
  </a>
</template>

<script>
export default {
  props: ["to", "title"],
};
</script>
