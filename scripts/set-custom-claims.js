const { credential } = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");

// Before running the script, temporarily copy the service account config in here
// Caution: Never commit the config!
const config = {
  project_id: "",
  private_key: "",
  client_email: "",
  apiKey: "",
  authDomain: "",
  projectId: "",
};

async function setCustomClaims() {
  const cert = credential.cert(config);

  const firebaseApp = admin.initializeApp({
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
    const role = docData["role"];
    const uid = docData["uid"];

    await admin.auth().setCustomUserClaims(uid, {
      role: role,
    });

    console.log(`Updated role for UID "${uid}" to "${role}"`);
  });
}

setCustomClaims();
