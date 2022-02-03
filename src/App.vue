<template>
  <h1>Hallo Nov Class {{ counter }}</h1>
  <button @click="counter++">Add Count</button>
  <CBEMainHeader class="main-header" />
  <CBEMainNavigation />
  <main>
    <router-view />
  </main>
  <CBEMainFooter />
</template>

<script>
import CBEMainFooter from "@/components/CBEMainFooter/CBEMainFooter.vue";
import CBEMainHeader from "@/components/CBEMainHeader/CBEMainHeader.vue";
import CBEMainNavigation from "@/components/CBEMainNavigation/CBEMainNavigation.vue";

export default {
  name: "App",
  data: () => {
    return {
      counter: 0,
    };
  },
  components: {
    CBEMainNavigation,
    CBEMainHeader,
    CBEMainFooter,
  },
  mounted() {
    this.$store.commit({
      type: "setUserLoginState",
      isLoggedIn: sessionStorage.getItem("userLoginState"),
    });
    this.$store.commit({
      type: "setCurrentUserToken",
      userToken: sessionStorage.getItem("currentUserToken"),
    });
    this.$store.commit({
      type: "setCurrentUserID",
      userID: sessionStorage.getItem("currentUserID"),
    });
    this.$store.commit({
      type: "setCurrentUserName",
      userName: sessionStorage.getItem("currentUserName"),
    });
    this.$store.commit({
      type: "setCurrentUserGitURL",
      gitURL: sessionStorage.getItem("currentUserGitURL"),
    });
    this.$store.commit({
      type: "setCurrentUserEmail",
      mail: sessionStorage.getItem("currentUserEmail"),
    });
    this.$store.commit({
      type: "setCurrentUserScreenname",
      userScreenname: sessionStorage.getItem("currentUserScreenname"),
    });
    this.$store.commit(
      "setCurrentUserRole",
      sessionStorage.getItem("currentUserRole")
    );
    this.$store.commit(
      "setCurrentUser",
      JSON.parse(sessionStorage.getItem("currentUser"))
    );
  },
};
</script>

<style></style>
