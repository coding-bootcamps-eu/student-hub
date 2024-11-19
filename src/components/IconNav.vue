<template>
  <nav>
    <menu
      class="
        flex
        justify-between
        bg-violet-100
        fixed
        w-full
        bottom-0
        px-4
        lg:static lg:flex-col lg:h-full lg:justify-start
        overflow-x-auto
      ">
      <IconNavItem
        v-for="link of links"
        :key="link.to"
        :to="link.to"
        :text="link.title">
        <component :is="link.icon + 'Icon'" />
      </IconNavItem>
    </menu>
  </nav>
</template>

<script>
import HomeIcon from "./icons/lobby/HomeIcon.vue";
import PlayIcon from "./icons/lobby/PlayIcon.vue";
import CalendarIcon from "./icons/lobby/CalendarIcon.vue";
import HospitalIcon from "./icons/lobby/HospitalIcon.vue";

import IconNavItem from "./IconNavItem.vue";

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
      links: [
        {
          title: "Lobby",
          to: "/",
          icon: "Home",
        },
        {
          title: "Sessions",
          to: "/recordings",
          icon: "Play",
        },
        {
          title: "Module",
          to: "/schedule",
          icon: "Calendar",
        },
        {
          title: "Abmelden",
          to: "https://form.asana.com/?k=msqPDRYEAxA8uspT_xcYbw&d=1181024715195521",
          icon: "Hospital",
        },
      ],
    };
  },
};
</script>
