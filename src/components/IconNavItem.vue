<template>
  <template v-if="to.startsWith('http')">
    <li>
      <a :href="to" target="_blank" :class="linkClasses">
        <div :class="iconClasses">
          <slot></slot>
        </div>
        {{ text }}
      </a>
    </li>
  </template>
  <template v-else>
    <RouterLink :to="to" :class="linkClasses">
      <div :class="iconClasses">
        <slot></slot>
      </div>
      {{ text }}
    </RouterLink>
  </template>
</template>

<script>
export default {
  props: ["to", "text"],

  data() {
    return {
      iconClasses: `
        w-6
      `,
    };
  },

  computed: {
    linkClasses() {
      let base = `
        bg-violet-100
        text-violet-700
        flex
        flex-col
        md:px-12
        md:flex-row
        md:gap-4
        md:text-base
        md:hover:bg-violet-200
        md:hover:text-violet-700
        items-center
        p-4
        text-xs
        md:rounded
      `;

      if (this.to === this.$route.path) {
        base += " bg-violet-700 text-white";
      }

      return base;
    },
  },
};
</script>
