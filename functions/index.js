const admin = require("firebase-admin");
const { studenthubApi } = require("./meetings");
const { zoomApi } = require("./zoom/zoom");
const {
  setUserClaimsOnUserCreate,
  setUserClaimsOnUserUpdate,
} = require("./user-claims");

admin.initializeApp();

// student hub api
exports.studenthub = studenthubApi;

// Zoom Api
exports.zoom = zoomApi;

// User Claims
exports.setUserClaimsOnUserCreate = setUserClaimsOnUserCreate;
exports.setUserClaimsOnUserUpdate = setUserClaimsOnUserUpdate;
