<template>
  <button
    v-if="this.$store.state.isLoggedIn"
    @click="logout"
    class="btn-git-logout"
  >
    Logout
  </button>

  <button
    v-if="!this.$store.state.isLoggedIn"
    @click="login"
    class="btn-git-login"
  >
    Login with GitHub
  </button>
</template>

<script>
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import firestore from "@/firestore";

export default {
  name: "CBELogin",
  methods: {
    async isUserInDB(accessToken) {
      const docRef = doc(firestore, "all-users", accessToken);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return true;
      } else {
        return false;
      }
    },

    async login() {
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      provider.addScope("public_repo");

      signInWithPopup(auth, provider).then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        this.isUserInDB(result.user.uid).then((userExists) => {
          if (!userExists) {
            // Create record for user in all-users collection
            setDoc(doc(firestore, "all-users", result.user.uid), {
              uid: result.user.uid,
              githubName: result.user.displayName,
              githubScreenName: result._tokenResponse.screenName,
              githubToken: token,
              githubProfileUrl:
                "https://github.com/" + result._tokenResponse.screenName,
              email: result.user.email,
              role: "guest",
            });
          }
        });

        this.$store.dispatch("login", result.user);
        this.$router.push("/");
      });
    },

    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push("/logout");
          this.$store.dispatch("logout");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
  },
};
</script>

<style lang="css" scoped></style>
