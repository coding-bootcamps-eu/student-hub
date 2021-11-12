<template>
  <section class="question-list" id="questionList">
    <div class="user-options">
      <div class="filter-options">
        <div class="single-filter-wrapper">
          <input
            type="radio"
            v-model="questionFilterStatus"
            name="filter"
            id="filterAll"
            value="All"
            data-cy="input-radio-all"
          />
          <label for="filterAll">Alle Fragen</label>
        </div>
        <div class="single-filter-wrapper">
          <input
            type="radio"
            v-model="questionFilterStatus"
            name="filter"
            id="filterOpen"
            value="false"
            data-cy="input-radio-open"
          />
          <label for="filterOpen">Offene Fragen</label>
        </div>
        <div class="single-filter-wrapper">
          <input
            type="radio"
            v-model="questionFilterStatus"
            name="filter"
            id="filterClosed"
            value="true"
            data-cy="input-radio-closed"
          /><label for="filterClosed">Beantwortete Fragen</label>
        </div>
      </div>
    </div>
    <div class="question-list-wrapper">
      <ol id="questions">
        <QuestionListElement
          v-for="question in filteredQuestions"
          :key="question.questionKey"
          :questionTitle="question.questionData.questionTitle"
          :questionAuthor="question.questionData.questionAuthor"
          :questionCategory="question.questionData.questionCategory"
          :questionCreated_at="question.questionData.questionCreated_at"
          :questionUpvotes="question.questionData.questionUpvotes"
          :questionIsDone="question.questionData.questionIsDone"
          v-bind="question"
          @upvote="voteQuestion(question.questionKey, currentUserID)"
          @answer="answerQuestion(question.questionKey)"
          @takebackanswer="takebackanswer(question.questionKey)"
          @downvote="downVote(question.questionKey, currentUserID)"
        />
      </ol>
    </div>
  </section>
</template>

<script>
import QuestionListElement from "./QuestionListElement.vue";

import firestore from "@/firestore";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";

export default {
  name: "QuestionList",
  components: {
    QuestionListElement,
  },
  data() {
    return {
      usersVotedQuestionDOM: [],
      questionFilterStatus: "All",
    };
  },
  methods: {
    /**
     * Question Voting
     */
    async initUsersVotedQuestion() {
      const querySnapshot = await getDocs(
        collection(firestore, "ama-questions")
      );
      querySnapshot.forEach((doc) => {
        this.usersVotedQuestionDOM.push(doc.data().usersVotedQuestion);
      });
      this.$store.commit({
        type: "setUsersVotedQuestion",
        vote: this.usersVotedQuestionDOM,
      });
    },
    async createUsersVotedArray(questionKey) {
      const querySnapshot = await getDocs(
        collection(firestore, "ama-questions")
      );
      querySnapshot.forEach((doc) => {
        if (doc.id === questionKey) {
          this.usersVotedQuestionDOM.push(...doc.data().usersVotedQuestion);
          this.$store.commit({
            type: "setUsersVotedQuestion",
            vote: this.usersVotedQuestionDOM,
          });
        }
      });
      this.$store.dispatch("updateAllQuestions");
    },
    isUserAllowedToVote(userIDInc) {
      if (this.$store.getters.getUsersVotedQuestion.includes(userIDInc)) {
        return false;
      } else {
        return true;
      }
    },
    async voteQuestion(questionKey, userIDInc) {
      await this.createUsersVotedArray(questionKey);
      if (this.isUserAllowedToVote(userIDInc) === true) {
        const questionRef = doc(firestore, "ama-questions", questionKey);
        updateDoc(questionRef, {
          usersVotedQuestion: arrayUnion(userIDInc),
        });
        const docRef = doc(firestore, "ama-questions", questionKey);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const voteRef = doc(firestore, "ama-questions", questionKey);
            updateDoc(voteRef, {
              questionUpvotes: docSnap.data().questionUpvotes + 1,
            });
          }
        });
      }
      this.$store.dispatch("updateAllQuestions");
    },
    downVote(questionKey, userIDInc) {
      this.createUsersVotedArray(questionKey);
      const questionRef = doc(firestore, "ama-questions", questionKey);
      updateDoc(questionRef, {
        usersVotedQuestion: arrayRemove(userIDInc),
      });
      const docRef = doc(firestore, "ama-questions", questionKey);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          const voteRef = doc(firestore, "ama-questions", questionKey);
          updateDoc(voteRef, {
            questionUpvotes: docSnap.data().questionUpvotes - 1,
          });
        }
      });
      this.$store.dispatch("updateAllQuestions");
    },
    /**
     * Question interaction
     */
    async answerQuestion(questionKey) {
      const questionRef = doc(firestore, "ama-questions", questionKey);
      await updateDoc(questionRef, {
        questionIsDone: true,
      });
      this.$store.dispatch("updateAllQuestions");
    },

    async takebackanswer(questionKey) {
      const questionRef = doc(firestore, "ama-questions", questionKey);
      await updateDoc(questionRef, {
        questionIsDone: false,
      });
      this.$store.dispatch("updateAllQuestions");
    },
    /**
     * Question sorting by votes
     */
    compareVotes(a, b) {
      if (a.questionData.questionUpvotes > b.questionData.questionUpvotes)
        return -1;
      if (a.questionData.questionUpvotes < b.questionData.questionUpvotes)
        return 1;
      return 0;
    },
  },
  computed: {
    currentUserID() {
      return this.$store.getters.getCurrentUserID;
    },
    filteredQuestions: function () {
      let questionFilterStatus = this.questionFilterStatus;
      if (questionFilterStatus === "All") {
        return this.$store.getters.getAllQuestions
          .slice(0)
          .sort(this.compareVotes);
      } else if (questionFilterStatus === "false") {
        return this.$store.getters.getAllQuestions
          .slice(0)
          .sort(this.compareVotes)
          .filter((question) => {
            return question.questionData.questionIsDone === false;
          });
      } else {
        return this.$store.getters.getAllQuestions
          .slice(0)
          .sort(this.compareVotes)
          .filter((question) => {
            return question.questionData.questionIsDone === true;
          });
      }
    },
  },
  async created() {
    await this.$store.dispatch("setAllQuestions");
    await this.initUsersVotedQuestion();
    document.title = "AMA-Fragenliste";
  },
};
</script>
<style lang="scss" scoped>
ol {
  all: unset;
}
ol > li {
  display: flex;
}
.filter-options {
  display: flex;
  flex-flow: row;
  align-items: flex-start;
  padding: 1.5rem 0 1rem 2.5rem;
  label {
    margin-right: 1rem;
  }
}
.question-list-wrapper {
  margin: 0 4rem 0 2.5rem;
}
@media only screen and (max-width: 814px) {
  .question-list-wrapper {
    margin: 0 2rem 0 2.5rem;
  }

  ol > li {
    display: flex;
    flex-flow: column;
  }
  .filter-options {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
  }
}
@media only screen and (max-width: 600px) {
  .question-list-wrapper {
    margin: 0 2rem 0 1rem;
  }
  .filter-options {
    padding: 0;
    margin: 0 1rem;
  }
}
</style>
