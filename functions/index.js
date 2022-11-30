const admin = require("firebase-admin");
const { studenthubApi } = require("./meetings");
const {
  setUserClaimsOnUserCreate,
  setUserClaimsOnUserUpdate,
} = require("./user-claims");
const { zoomApi } = require("./zoom/zoom");

admin.initializeApp();

// student hub api
exports.studenthub = studenthubApi;

// User Claims
exports.setUserClaimsOnUserCreate = setUserClaimsOnUserCreate;
exports.setUserClaimsOnUserUpdate = setUserClaimsOnUserUpdate;

// Zoom Api
exports.zoomMeetings = zoomApi;
