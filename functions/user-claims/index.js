const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { info } = require("firebase-functions/logger");

// Todo: export to own file
const setUserClaimsOnUserCreate = functions
  .region("europe-west3")
  .firestore.document("all-users/{uid}")
  .onCreate(updateRoleInUserClaims);

const setUserClaimsOnUserUpdate = functions
  .region("europe-west3")
  .firestore.document("all-users/{uid}")
  .onUpdate(updateRoleInUserClaims);

function updateRoleInUserClaims(change, context) {
  const uid = context.params.uid;
  const role = change.after.data()["role"];

  admin
    .auth()
    .setCustomUserClaims(uid, {
      role: role,
    })
    .then(() => {
      info(`Updated role for UID "${uid}" to "${role}"`);
    });

  return null;
}

module.exports = {
  setUserClaimsOnUserCreate,
  setUserClaimsOnUserUpdate,
};
