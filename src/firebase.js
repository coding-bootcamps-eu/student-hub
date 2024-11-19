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
import { useAppStore } from "@/stores/app.js";

export const firebaseFunctionsPrefix = import.meta.env
  .VITE_FIREBASE_FUNCTIONS_PREFIX;

const firebaseApp = initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
});
export const db = getFirestore(firebaseApp);
export const auth = getAuth();

const mode = import.meta.env.NODE_ENV;
const emulator = import.meta.env.VITE_FIREBASE_EMULATOR
  ? import.meta.env.VITE_FIREBASE_EMULATOR.toLocaleLowerCase()
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
        await useAppStore().login(user);
      } else {
        await useAppStore().logout();
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
  try {
    // Check if document exists with documentId === uid
    const docRef = doc(db, "all-users", uid);
    const userDoc = await getDoc(docRef);
    if (userDoc.exists()) {
      return true;
    }
  } catch (err) {
    console.error("Error while searching for user document in firestore", err);
  }

  return false;
}

/**
 * Creates new user document for userCrendentials passed by GitHub authentication provider
 * @param {*} uid
 * @param {*} userDetails
 */
export async function createUserDocument(uid, userDetails) {
  await setDoc(doc(db, "all-users", uid), userDetails);
}
