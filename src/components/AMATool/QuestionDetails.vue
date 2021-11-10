<template>
  <section>
    <h2 class="question-title">{{ computedQuestion.questionTitle }}</h2>
    <div class="heading-wrapper">
      <p class="question-author">{{ computedQuestion.questionAuthor }}</p>
      <p class="question-cat">{{ computedQuestion.questionCategory }}</p>
      <p class="question-date">{{ computedQuestion.questionCreated_at }}</p>
    </div>
    <div id="question-description" name="question-description">
      <Markdown
        class="question-description"
        :source="computedQuestion.questionDescription"
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

<style lang="scss" scoped>
h2 {
  text-align: left;
}
.heading-wrapper {
  display: flex;
  justify-content: space-between;
}

section {
  display: grid;
  margin: 0.5rem;
  border: 0.5px solid var(--primary-color);
  border-radius: 0.25rem;
}
.question-description {
  text-align: left;
  padding: 0 0.25rem;
}
.question-title {
  font-size: 1em;
  margin: 0;
  padding: 0.25rem;
  border-bottom: 0.5px solid var(--secondary-color);
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.heading-wrapper {
  padding: 0 0.25rem;
  border-bottom: 0.5px solid var(--secondary-color);
}
.heading-wrapper > p {
  margin: 0;
  padding: 0.5rem 0;
  font-size: 0.9em;
  &:first-child {
    padding-right: 0.25rem;
    border-right: 0.5px dotted var(--primary-color);
  }
  &:last-child {
    padding-left: 0.25rem;
    border-left: 0.5px dotted var(--primary-color);
  }
}

@media screen and (min-width: 555px) {
  section {
    margin: 0 4rem 0 2.5rem;
  }
}
</style>
