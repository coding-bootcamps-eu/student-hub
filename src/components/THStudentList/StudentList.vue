<template>
  <ul>
    <StudentListElement
      v-for="student in this.$store.getters.getAllStudents"
      :key="student.studentKey"
      :email="student.studentData.email"
      :gitDisplayName="student.studentData.gitDisplayName"
      :gitScreenName="student.studentData.gitScreenName"
      :gitToken="student.studentData.gitToken"
      :studentRotis="student.studentData.studentRotis"
      :userIssues="student.studentData.userIssues"
      :userRepos="student.studentData.userRepos"
      :gitURL="student.studentData.gitURL"
      :userScheduleURL="student.studentData.userScheduleURL"
      :studentKey="student.studentKey"
      v-bind="student"
    />
  </ul>
</template>

<script>
import StudentListElement from "@/components/THStudentList/StudentListElement.vue";
export default {
  name: "StudentList",
  components: { StudentListElement },
  async created() {
    await this.$store.dispatch("updateStudentsIssuesCounter");
    await this.$store.dispatch("updateStudentsReposCounter");
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  max-width: 100%;
  gap: 1rem;
}
li {
  border-top: 1px solid var(--primary-color);
  border-bottom: 1px solid var(--primary-color);
  align-items: baseline;
}
@media screen and (min-width: 555px) {
  li {
    border: 1px solid var(--primary-color);
    border-radius: 0.25rem;
  }
}
</style>
