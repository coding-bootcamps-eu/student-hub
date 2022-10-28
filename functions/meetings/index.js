const functions = require("firebase-functions");
const { google } = require("googleapis");
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const { getTodaysMeetings, getMeetingsForWeek } = require("./meetings");

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
    if (req.get("Authorization")) {
      const tokenId = req.get("Authorization").split("Bearer ")[1];
      const decoded = await admin.auth().verifyIdToken(tokenId);
      const user = await admin.auth().getUser(decoded.uid);
      if (
        user.customClaims &&
        (user.customClaims.role === "teacher" ||
          user.customClaims.role === "student")
      ) {
        console.log(user.customClaims);

        const meetings = await getTodaysMeetings(
          calendarApi,
          calendarId,
          serviceAccountAuth
        );
        res.send(meetings);
      }
    } else {
      res.status(403).send(new Error("Not authorized"));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

restApi.get("/meetings/week", async (req, res) => {
  try {
    if (req.get("Authorization")) {
      const tokenId = req.get("Authorization").split("Bearer ")[1];
      const decoded = await admin.auth().verifyIdToken(tokenId);
      const user = await admin.auth().getUser(decoded.uid);
      if (
        user.customClaims &&
        (user.customClaims.role === "teacher" ||
          user.customClaims.role === "student")
      ) {
        const year = parseInt(req.query["year"]);
        const week = parseInt(req.query["week"]);

        const meetings = await getMeetingsForWeek(
          calendarApi,
          calendarId,
          serviceAccountAuth,
          year,
          week
        );
        res.send(meetings);
      }
    } else {
      res.status(403).send(new Error("Not authorized"));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

const studenthubApi = functions
  .runWith({
    secrets: ["SERVICE_ACCOUNT_PRIVATE_KEY", "SERVICE_ACCOUNT_EMAIL"],
  })
  .region("europe-west3")
  .https.onRequest(restApi);

module.exports = {
  studenthubApi,
};
