<template>
  <template v-if="to.startsWith('http')">
    <a :href="to" target="_blank" :class="linkClasses">
      {{ text }}
      <div :class="iconClasses">
        <slot></slot>
      </div>
    </a>
  </template>
  <template v-else>
    <RouterLink :to="to" :class="linkClasses">
      {{ text }}
      <div :class="iconClasses">
        <slot></slot>
      </div>
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
        w-full
        rounded
        text-violet-700
        uppercase
        py-4
        flex
        justify-center
        overflow-hidden
        relative
        shadow-sm
        md:hover:bg-violet-200
        md:[&:hover>div]:opacity-100
        md:[&:hover>div]:rotate-0
        md:[&:hover>div]:translate-y-[-15%]
        md:[&:hover>div]:translate-x-2
      `,
      iconClasses: `
        w-12 
        absolute 
        opacity-25 
        rotate-6 
        left-0 
        -bottom-1
        transition-transform
      `,
    };
  },
};
</script>
