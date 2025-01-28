<template>
  <section>
    <header class="page-heading">
      <p class="bg-indigo-100 p-2 rounded text-violet-700">
        Hello {{ store.userName }}! 👋 {{ randomQuote }}
      </p>
    </header>
<<<<<<< HEAD
    <ItemsGrid />
=======
    <ItemsGrid :view="selectedView" />
>>>>>>> 48d5a7b6beedb32133e75759f62a57569da0adfa
  </section>
</template>

<script>
import ItemsGrid from "@/components/Lobby/ItemsGrid.vue";

import { useAppStore } from "@/stores/app";

export default {
  data() {
    return {
<<<<<<< HEAD
=======
      store: useAppStore(),
      selectedView: "teacher",
>>>>>>> 48d5a7b6beedb32133e75759f62a57569da0adfa
      greetings: [
        "Embrace today's challenges.",
        "Every line of code is a step forward.",
        "Beginnings are opportunities in disguise.",
        "Your journey started with a single keystroke.",
        "Unlock your potential with every commit.",
        "Coding is the language of possibility.",
        "With each bug fixed, you grow stronger.",
        "Every error is a lesson waiting to be learned.",
        "Dare to dream in code.",
        "Your future awaits in the lines you write.",
        "Seize the opportunity to create.",
        "In every bug lies an opportunity to learn.",
        "Embrace the beauty of your code's evolution.",
        "New beginnings pave the path to success.",
        "Code your way to new horizons.",
        "With every function, you sculpt your future.",
        "Failure is just a stepping stone to mastery.",
        "In coding, there's always room for improvement.",
        "Transform challenges into triumphs.",
        "Embrace the process of growth and discovery.",
        "Your journey begins with 'Hello, World!'",
        "Coding is the art of continuous reinvention.",
        "Every commit is a step towards greatness.",
        "Believe in the power of your code.",
        "New beginnings, endless possibilities.",
        "Coding is the bridge between dreams and reality.",
        "Embrace the discomfort of growth.",
        "Success is the sum of small efforts repeated daily.",
        "In every challenge, there's an opportunity for growth.",
        "The only way to fail is to never begin.",
        "Your determination fuels your journey.",
        "Rise to the challenge and exceed your own expectations.",
        "Stay curious, stay hungry, keep coding.",
        "With each line of code, you shape your destiny.",
        "The road to mastery begins with a single step.",
      ],
    };
  },

  components: {
    ItemsGrid,
  },

  methods: {
    getRandomQuote() {
      const randomIndex = Math.floor(Math.random() * this.greetings.length);

      return this.greetings[randomIndex];
    },
  },

  computed: {
    isTeacher() {
      return this.store.isTeacher;
    },

    randomQuote() {
      return this.getRandomQuote();
    },
  },
};
</script>
