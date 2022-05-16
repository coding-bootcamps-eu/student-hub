require("dotenv").config();
const { credential } = require("firebase-admin");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const config = {
  project_id: "",
  private_key: "",
  client_email: "",
  apiKey: "",
  authDomain: "",
  projectId: "",
};

async function migrateUsers() {
  const cert = credential.cert(config);

  const firebaseApp = initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    credential: cert,
  });

  const firestore = getFirestore(firebaseApp);
  const snapshot = await firestore.collection("all-users").get();
  const docs = snapshot.docs;

  docs.forEach(async (doc) => {
    const docData = doc.data();
    if (doc.id !== docData.uid) {
      console.log("\n-----------------------------------------------");
      console.log(docData);
      const userRecordExists = docs.find((x) => x.id === docData.uid);
      if (!userRecordExists) {
        console.log("Create new user record for UID: " + doc.id);
        await firestore.collection("all-users").doc(docData.uid).set(docData);
      }
      console.log(`Deleting old doc for uid (${docData.uid}) / id (${doc.id})`);
      await firestore.collection("all-users").doc(doc.id).delete();
    }
  });
}

migrateUsers();
