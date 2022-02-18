<template>
  <button v-if="this.$store.state.isLoggedIn" @click="logout" class="button">
    Logout
  </button>

  <button v-if="!this.$store.state.isLoggedIn" @click="login" class="button">
    Login with GitHub
  </button>
</template>

<script>
import { GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { addDoc, getDocs, query, where, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default {
  name: "CBELogin",
  methods: {
    async isUserInDB(accessToken) {
      const docs = await getDocs(
        query(collection(db, "all-users"), where("uid", "==", accessToken))
      );
      if (docs.size === 0) {
        return false;
      } else if (docs.size === 1) {
        return true;
      } else {
        console.error("Multiple entries found for uid ", accessToken);
      }
    },

    async login() {
      const provider = new GithubAuthProvider();
      provider.addScope("public_repo");

      signInWithPopup(auth, provider).then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        this.isUserInDB(result.user.uid).then((userExists) => {
          if (!userExists) {
            // Create record for user in all-users collection
            addDoc(collection(db, "all-users"), {
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
      });
    },

    logout() {
      signOut(auth)
        .then(() => {
          this.$store.dispatch("logout");
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    },
  },
};
</script>

<style lang="css" scoped>
.button {
  cursor: pointer;
  padding: 0.3rem 2.5rem;
  background: #f2f2f2;
  border: 1.75px solid #262626;
  box-sizing: border-box;
  border-radius: 0.3rem;
  font-weight: 600;
}

.button:hover {
  background-color: #262626;
  color: white;
}
</style>
