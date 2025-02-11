<template>
  <nav>
    <menu class="
        fixed
        z-50
        bottom-0
        flex
        justify-between
        bg-gray-100
        w-full
        px-2
        md:sticky md:top-0 md:flex-col md:h-full md:justify-start md:gap-4
        overflow-x-auto
      ">
      <template v-if="store.user">
        <IconNavItem v-for="link of store.links" :key="link.to" :to="link.to" :text="link.title">
          <component :is="link.icon + 'Icon'" />
        </IconNavItem>
      </template>
    </menu>
  </nav>
</template>

<script>
import HomeIcon from "@/components/icons/lobby/HomeIcon.vue";
import PlayIcon from "@/components/icons/lobby/PlayIcon.vue";
import CalendarIcon from "@/components/icons/lobby/CalendarIcon.vue";
import HospitalIcon from "@/components/icons/lobby/HospitalIcon.vue";
import IconNavItem from "@/components/Layout/Navigation/IconNavItem.vue";

import { useAppStore } from "@/stores/app";

export default {
  components: {
    HomeIcon,
    PlayIcon,
    CalendarIcon,
    HospitalIcon,
    IconNavItem,
  },

  data() {
    return {
      store: useAppStore(),
    };
  },
};
</script>
