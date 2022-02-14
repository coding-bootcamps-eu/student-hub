import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import store from "./store";
import { getDoc, doc } from "firebase/firestore";
import firestore from "@/firestore";

const firebaseFirestore = initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
});
const firestoreDB = getFirestore(firebaseFirestore);

export default firestoreDB;

const onAuthStateChangedPromise = new Promise((resolve, reject) => {
  getAuth().onAuthStateChanged(
    async (user) => {
      store.dispatch(user !== null ? "login" : "logout", user);

      if (user !== null) {
        const docRef = doc(firestore, "all-users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let role = docSnap.data().role;
          if (role === undefined) {
            role = null;
          }
          store.commit("setRole", role);
        }
      }
      resolve(user);
    },
    (err) => {
      reject(err);
    }
  );
});
export const onAuthStateInit = () => onAuthStateChangedPromise;
