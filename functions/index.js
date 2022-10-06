const functions = require("firebase-functions");
const { google } = require("googleapis");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { getTodaysMeetings } = require("./meetings/meetings");
const { info } = require("firebase-functions/lib/logger");

admin.initializeApp();

// Express REST api with cors (cross origin requests)
const restApi = express();
restApi.use(cors({ origin: true }));

const calendarId = "c_g6tobjgvg073o6tf566630nks4@group.calendar.google.com";

// Service Acccount / JWT
const serviceAccountAuth = new google.auth.JWT({
  email: process.env.SERVICE_ACCOUNT_EMAIL,
  key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
  scopes: "https://www.googleapis.com/auth/calendar",
});
const calendarApi = google.calendar("v3");

restApi.get("/meetings/today", async (req, res) => {
  try {
    const meetings = await getTodaysMeetings(
      calendarApi,
      calendarId,
      serviceAccountAuth
    );
    res.send(meetings);
  } catch (err) {
    res.status(500).send(err);
  }
});

exports.studenthub = functions
  .runWith({
    secrets: ["SERVICE_ACCOUNT_PRIVATE_KEY", "SERVICE_ACCOUNT_EMAIL"],
  })
  .region("europe-west3")
  .https.onRequest(restApi);

// Todo: export to own file
exports.setUserClaimsOnUserCreate = functions
  .region("europe-west3")
  .firestore.document("all-users/{uid}")
  .onCreate(updateRoleInUserClaims);

exports.setUserClaimsOnUserUpdate = functions
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
