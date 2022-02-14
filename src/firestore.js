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
      await store.dispatch(user !== null ? "login" : "logout", user);
      resolve();
    },
    (err) => {
      reject(err);
    }
  );
});
export const onAuthStateInit = () => onAuthStateChangedPromise;

export const loadUserRole = (user) => {
  return new Promise((resolve) => {
    let role = null;
    const docRef = doc(firestore, "all-users", user.uid);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        role = docSnap.data().role;
        if (role === undefined) {
          role = null;
        }
      }
      resolve(role);
    });
  });
};
