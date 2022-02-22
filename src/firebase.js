import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import store from "./store";

const firebaseApp = initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
});
export const db = getFirestore(firebaseApp);
export const auth = getAuth();

const mode = process.env.NODE_ENV;
const emulator = process.env.VUE_APP_FIREBASE_EMULATOR
  ? process.env.VUE_APP_FIREBASE_EMULATOR.toLocaleLowerCase()
  : "off";

if (mode === "development") {
  if (emulator === "on") {
    console.info("EMULATED MODE: ON");
    connectFirestoreEmulator(db, "localhost", 8090);
  } else {
    console.info("EMULATED MODE: OFF");
  }
}

const onAuthStateChangedPromise = new Promise((resolve, reject) => {
  auth.onAuthStateChanged(
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
    getDocs(
      query(collection(db, "all-users"), where("uid", "==", user.uid))
    ).then((docs) => {
      if (docs.size === 0) {
        // user record not found
      } else if (docs.size === 1) {
        // User record found
        role = docs.docs[0].data().role;
      } else {
        console.error("Multiple entries found for uid ", user.uid);
      }
      resolve(role === undefined ? null : role);
    });
  });
};
