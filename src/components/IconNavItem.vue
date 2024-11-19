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
      linkClasses: `
        bg-violet-100
        text-violet-700
        flex
        flex-col
        lg:flex-row
        lg:gap-4
        lg:text-base
        lg:hover:bg-violet-200
        lg:hover:rounded
        items-center
        p-4
        text-xs
      `,
      iconClasses: `
        w-6
      `,
    };
  },
};
</script>
