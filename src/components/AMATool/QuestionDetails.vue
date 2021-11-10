<template>
  <section>
    <h2>{{ computedQuestion.questionTitle }}</h2>
    <div id="question-description" name="question-description">
      <Markdown
        class="question-description"
        :source="computedQuestion.questionDescription"
        text-align:
        left
      />
    </div>
    <div class="question-button-wrapper">
      <cbe-main-btn
        id="button"
        buttonClass="primary"
        @click="browseBack"
        data-cy="back-button"
        >ZURÜCK
      </cbe-main-btn>
    </div>
  </section>
</template>

<script>
import Markdown from "vue3-markdown-it";

export default {
  name: "QuestionDetails",
  computed: {
    computedQuestion() {
      return this.$store.getters.getSingleQuestion;
    },
  },
  components: {
    Markdown,
  },
  methods: {
    browseBack() {
      this.$router.replace("/amaview");
    },
  },
  created() {
    this.$store.dispatch("setSingleQuestion", {
      questionKey: this.$route.params.questionKey,
    });
  },
  unmounted() {
    this.$store.commit("setSingleQuestion", {
      question: {},
    });
  },
  beforeRouteUpdate() {
    this.questionKey = this.$route.params.questionKey;
  },
};
</script>
