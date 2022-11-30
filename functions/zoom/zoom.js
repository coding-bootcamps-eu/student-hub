const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const restApi = express();
restApi.use(cors({ origin: true }));

restApi.get("/class-rooms", async (req, res) => {
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
        const auth =
          "Basic " +
          Buffer.from(
            process.env.ZOOM_OAUTH_USER + ":" + process.env.ZOOM_OAUTH_PASSWORD
          ).toString("base64");

        const authResponse = await fetch(
          "https://api.zoom.us/oauth/token/?grant_type=account_credentials&account_id=l8s2l2jmQleLbvZ29ZvbBg",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: auth,
            },
          }
        );

        if (!authResponse.ok) {
          res.status(403).send(new Error("Not authorized"));
        }
        const authJson = await authResponse.json();

        const users = [
          "camp+class-alpha@coding-bootcamps.eu",
          "camp+class-beta@coding-bootcamps.eu",
          "camp+class-gamma@coding-bootcamps.eu",
          "camp+teilzeit@coding-bootcamps.eu",
        ];

        const meetings = [];
        for (let user of users) {
          const meetingsResponse = await fetch(
            `https://api.zoom.us/v2/users/${user}/meetings`,
            {
              headers: {
                Authorization: "Bearer " + authJson.access_token,
              },
            }
          );
          const userMeetings = await meetingsResponse.json();
          meetings.push({ user, meetings: userMeetings.meetings });
        }

        res.json(meetings);
      }
    } else {
      res.status(403).send(new Error("Not authorized"));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

const zoomApi = functions
  .runWith({
    secrets: ["ZOOM_OAUTH_USER", "ZOOM_OAUTH_PASSWORD"],
  })
  .region("europe-west3")
  .https.onRequest(restApi);

module.exports = {
  zoomApi,
};
