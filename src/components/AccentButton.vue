<template>
  <a :href="to">
    <slot class="test" />
    <span>
      {{ title }}
    </span>
  </a>
</template>

<script>
export default {
  props: ["to", "title"]
}
</script>

<style scoped>
a {
  background-color: var(--clr-accent);
  color: white;
  text-decoration: none;

  padding: var(--s-xs) calc(var(--s-xs) * 3);
  border: 2px solid transparent;
  border-radius: var(--radius-inner);
  width: fit-content;
}

a:has(svg) {
  display: flex;
  align-items: center;
  gap: .5rem;
}

a:hover {
  background-color: var(--clr-accent-hover);

  border-color: var(--clr-accent);
}
</style>