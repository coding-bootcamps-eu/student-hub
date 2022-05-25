import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import store from "./store";

export const firebaseFunctionsPrefix =
  process.env.VUE_APP_FIREBASE_FUNCTIONS_PREFIX;

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
      if (user !== null) {
        await store.dispatch("login", user);
      } else {
        await store.dispatch("logout");
      }
      resolve();
    },
    (err) => {
      reject(err);
    }
  );
});
export const onAuthStateInit = () => onAuthStateChangedPromise;

export const loadUserDetails = async (user) => {
  // Default: find user document with document.id === user.uid
  const docRef = doc(db, "all-users", user.uid);
  const userDoc = await getDoc(docRef);
  if (userDoc.exists()) {
    const userData = userDoc.data();
    return userData;
  }

  // Fallback: find user document with random documentId and uid === uid
  const docs = await getDocs(
    query(collection(db, "all-users"), where("uid", "==", user.uid))
  );

  if (docs.size === 0) {
    throw new Error("No user document found for uid ", user.uid);
  } else if (docs.size === 1) {
    const userDoc = docs.docs[0];
    const userData = userDoc.data();

    if (userDoc.id !== user.uid) {
      createUserDocument(user.uid, userData);

      // const oldDocumentRef = userDoc.ref;
      // await deleteDoc(oldDocumentRef);
      // console.info("Deleted old user doc with incorrect id");
    }

    return userData;
  } else {
    throw new Error("Multiple entries found for uid ", user.uid);
  }
};

/**
 * Check if a document is in the all-users collection for a specific uid
 * @param {*} uid (string)
 * @returns boolean
 */
export async function doesUserRecordExist(uid) {
  // Check if document exists with documentId === uid
  const docRef = doc(db, "all-users", uid);
  const userDoc = await getDoc(docRef);
  if (userDoc.exists()) {
    return true;
  }

  // Fallback Behavior: find documents where uid === uid
  const docs = await getDocs(
    query(collection(db, "all-users"), where("uid", "==", uid))
  );
  if (docs.size === 0) {
    return false;
  } else {
    return true;
  }
}

/**
 * Creates new user document for userCrendentials passed by GitHub authentication provider
 * @param {*} uid
 * @param {*} userDetails
 */
export async function createUserDocument(uid, userDetails) {
  await setDoc(doc(db, "all-users", uid), userDetails);
}
