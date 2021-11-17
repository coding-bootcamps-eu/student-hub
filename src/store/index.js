import { createStore } from "vuex";
import firestore from "@/firestore";

import {
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
  query,
  where,
  getDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

export default createStore({
  plugins: [],
  state: {
    /**
     * Current User States
     */
    currentUser: {},
    currentUserRole: "",
    currentUserName: "",
    currentUserID: "",
    currentUserToken: "",
    currentUserScreenname: "",
    currentUserEmail: "",
    currentUserGitURL: "",
    currentUserScheduleURL: "",
    /**
     * Issues Analyze by Glissario
     */
    issuesInfo: [],
    currentIssue: {
      name: "",
      status: "open",
      duration: null,
    },
    /**
     * StudentList / Profile
     */
    allStudents: [],
    studentIssuesCounter: 0,
    studentReposCounter: 0,
    userRotis: [],
    spUser: {},
    spUserQuestions: [],
    /**
     * AMA-Tool States
     */
    allQuestions: [],
    usersVotedQuestion: [],
    questionFilterStatus: "All",
    singleQuestion: {},
    /**
     * LearnProgress
     */
    studentLP: [],
    teacherLP: {},
    currentLP: {},
  },
  mutations: {
    //<- Current User Mutations ->
    setCurrentUser(state, payload) {
      sessionStorage.setItem("currentUser", JSON.stringify(payload));
      state.currentUser = payload;
    },
    setCurrentUserRole(state, payload) {
      sessionStorage.setItem("currentUserRole", payload);
      state.currentUserRole = payload;
    },
    setCurrentUserScreenname(state, payload) {
      sessionStorage.setItem("currentUserScreenname", payload.userScreenname);
      state.currentUserScreenname = payload.userScreenname;
    },
    setCurrentUserEmail(state, payload) {
      sessionStorage.setItem("currentUserEmail", payload.mail);
      state.currentUserEmail = payload.mail;
    },
    setCurrentUserGitURL(state, payload) {
      sessionStorage.setItem("currentUserGitURL", payload.gitURL);
      state.currentUserGitURL = payload.gitURL;
    },
    setCurrentUserName(state, payload) {
      sessionStorage.setItem("currentUserName", payload.userName);
      state.currentUserName = payload.userName;
    },
    setCurrentUserID(state, payload) {
      sessionStorage.setItem("currentUserID", payload.userID);
      state.currentUserID = payload.userID;
    },
    setCurrentUserToken(state, payload) {
      sessionStorage.setItem("currentUserToken", payload.userToken);
      state.currentUserToken = payload.userToken;
    },
    setCurrentUserScheduleURL(state, payload) {
      state.currentUserScheduleURL = payload.userScheduleURL;
    },
    setUserLoginState(state, payload) {
      sessionStorage.setItem("userLoginState", payload.isLoggedIn);
      state.userLoginState = payload.isLoggedIn;
    },

    // <- Issue Analyze ->
    setCurrentIssue(state, payload) {
      state.currentIssue = {
        name: payload.name,
        status: payload.status,
        duration: payload.duration,
      };
    },
    setIssuesInfo(state, payload) {
      state.issuesInfo = payload.issuesInfo;
    },

    // <- StudentList & Profile ->
    setStudentIssuesCounter(state, payload) {
      state.studentIssuesCounter = payload.studentIssuesCounter;
    },
    setStudentReposCounter(state, payload) {
      state.studentReposCounter = payload.studentReposCounter;
    },
    setspUserQuestions(state, payload) {
      state.spUserQuestions.push(payload);
    },
    setspUser(state, payload) {
      state.spUser = payload.user;
    },
    setAllStudents(state, payload) {
      state.allStudents = payload.allStudents;
    },

    // <- AMA - TOOL ->
    setQuestionFilterStatus(state, payload) {
      state.questionFilterStatus = payload.questionFilterStatus;
    },
    setUsersVotedQuestion(state, payload) {
      state.usersVotedQuestion = payload.vote;
    },
    setAllQuestions(state, payload) {
      state.allQuestions = payload.allQuestions;
    },
    setSingleQuestion(state, payload) {
      state.singleQuestion = payload.question;
    },

    // <- ROTI - TOOL ->
    setUserRotis(state, payload) {
      sessionStorage.setItem("userRotis", JSON.stringify(payload.userRotis));
      state.userRotis = payload.userRotis;
    },

    // <- Learn-Progress ->
    setStudentLP(state, payload) {
      state.studentLP = payload.studentLP;
    },
    setTeacherLP(state, payload) {
      state.teacherLP = payload.teacherLP;
    },
    setCurrentLP(state, payload) {
      state.currentLP = payload.currentLP;
    },
  },
  actions: {
    //<-StundentList & Profile->
    async setStudentIssuesCounter(state, payload) {
      let _userToken = "token " + payload.userToken;
      let url =
        "https://api.github.com/repos/" +
        payload.studentScreenName +
        "/bootcamp-schedule/issues";
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          authorization: _userToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      let _repoIssues = await httpElement.json();
      let _counter = await _repoIssues;
      state.commit("setStudentIssuesCounter", {
        studentIssuesCounter: _counter.length,
      });
      return await _counter.length;
    },
    async updateStudentsIssuesCounter(state) {
      await state.getters.getAllStudents.forEach((student) => {
        state
          .dispatch("setStudentIssuesCounter", {
            userToken: student.studentData.gitToken,
            studentScreenName: student.studentData.gitScreenName,
          })
          .then((counter) => {
            try {
              setDoc(doc(firestore, "all-users", student.studentKey), {
                email: student.studentData.email,
                gitDisplayName: student.studentData.gitDisplayName,
                gitScreenName: student.studentData.gitScreenName,
                gitToken: student.studentData.gitToken,
                gitURL: student.studentData.gitURL,
                userScheduleURL: student.studentData.userScheduleURL,
                id: student.studentData.id,
                studentRotis: student.studentData.studentRotis,
                userIssues: counter,
                userRepos: student.studentData.userRepos,
                userRole: student.studentData.userRole,
              });
            } catch (e) {
              console.error(e);
            }
          });
      });
    },
    async setStudentReposCounter(state, payload) {
      let _userToken = "token " + payload.userToken;
      const url =
        "https://api.github.com/users/" + payload.studentScreenName + "/repos";
      const httpElement = await fetch(url, {
        headers: {
          Accept: "application/json",
          authorization: _userToken,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      let _studentRepos = await httpElement.json();
      let _counter = await _studentRepos;
      state.commit("setStudentReposCounter", {
        studentReposCounter: _counter.length,
      });
      return await _counter.length;
    },
    async updateStudentsReposCounter(state) {
      await state.getters.getAllStudents.forEach((student) => {
        state
          .dispatch("setStudentReposCounter", {
            userToken: student.studentData.gitToken,
            studentScreenName: student.studentData.gitScreenName,
          })
          .then((counter) => {
            try {
              setDoc(doc(firestore, "all-users", student.studentKey), {
                email: student.studentData.email,
                gitDisplayName: student.studentData.gitDisplayName,
                gitScreenName: student.studentData.gitScreenName,
                gitToken: student.studentData.gitToken,
                gitURL: student.studentData.gitURL,
                userScheduleURL: student.studentData.userScheduleURL,
                id: student.studentData.id,
                studentRotis: student.studentData.studentRotis,
                userIssues: student.studentData.userIssues,
                userRepos: counter,
                userRole: student.studentData.userRole,
              });
            } catch (e) {
              console.error(e);
            }
          });
      });
    },
    async setspUser(state, payload) {
      onSnapshot(doc(firestore, "all-users", payload), (doc) => {
        state.commit({
          type: "setspUser",
          user: doc.data(),
        });
      });
    },
    async setAllStudents(state) {
      let _students = [];
      const userTableSnapshot = await getDocs(
        collection(firestore, "all-users")
      );
      userTableSnapshot.forEach((student) => {
        if (student.data().userRole === "student") {
          _students.push({
            studentKey: student.id,
            studentData: student.data(),
          });
        } else {
          //console.error("no teachers or guests are allowed in the list");
        }
      });
      state.commit({
        type: "setAllStudents",
        allStudents: _students,
      });
    },

    //<-AMA-TOOL->
    updateAllQuestions(state) {
      const q = query(collection(firestore, "ama-questions"));
      onSnapshot(q, (querySnapshot) => {
        const _questions = [];
        querySnapshot.forEach((doc) => {
          _questions.push({
            questionKey: doc.id,
            questionData: doc.data(),
          });
        });
        state.commit({
          type: "setAllQuestions",
          allQuestions: _questions,
        });
      });
    },
    async setAllQuestions(state) {
      let _questions = [];
      const querySnapshot = await getDocs(
        collection(firestore, "ama-questions")
      );
      querySnapshot.forEach((doc) => {
        _questions.push({
          questionKey: doc.id,
          questionData: doc.data(),
        });
        state.commit({
          type: "setAllQuestions",
          allQuestions: _questions,
        });
      });
    },
    async setUserQuestions(state, payload) {
      const q = query(
        collection(firestore, "ama-questions"),
        where("questionAuthorID", "==", payload)
      );
      const querySnapshot = await getDocs(q);
      if (state.getters.getUserQuestions[0] ?? null) {
        //console.error("Questions allready loaded");
      } else {
        querySnapshot.forEach((doc) => {
          state.commit("setspUserQuestions", {
            key: doc.id,
            data: doc.data(),
          });
        });
      }
    },
    async setSingleQuestion(state, payload) {
      const questionRef = doc(firestore, "ama-questions", payload.questionKey);
      const questionSnap = await getDoc(questionRef);
      if (questionSnap.exists()) {
        state.commit("setSingleQuestion", {
          question: questionSnap.data(),
        });
      } else {
        console.log("No such document!");
      }
    },
    async addQuestionToStudent(payload) {
      const studentRef = doc(firestore, "all-users", payload.currentUserID);
      await updateDoc(studentRef, {
        studentQuestions: arrayUnion(payload.question),
      });
    },

    //<-ROTI-TOOL->
    async setUserRotis(state, payload) {
      onSnapshot(doc(firestore, "all-users", payload), (doc) => {
        state.commit({
          type: "setUserRotis",
          userRotis: doc.data().studentRotis,
        });
      });
    },

    // <- Learn-Progress ->
    async setStudentLP(state, payload) {
      let _lps = [];
      const q = query(
        collection(firestore, "learn-progress"),
        where("userID", "==", payload.userID)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        _lps.push(doc.data());
      });
      state.commit({
        type: "setStudentLP",
        studentLP: _lps,
      });
      console.log(_lps);
    },
    async setTeacherLP(state, payload) {
      const lpRef = doc(firestore, "lp-answers", payload.lpKey);
      const lpSnap = await getDoc(lpRef);
      if (lpSnap.exists()) {
        state.commit("setTeacherLP", {
          teacherLP: lpSnap.data(),
        });
      } else {
        console.log("No such document!");
      }
    },
    async setCurrentLP(state, payload) {
      const lpRef = doc(firestore, "learn-progress", payload.lpKey);
      const lpSnap = await getDoc(lpRef);
      if (lpSnap.exists()) {
        state.commit("setCurrentLP", {
          currentLP: lpSnap.data(),
        });
      } else {
        console.log("No such document!");
      }
    },
    async updateLP(payload) {
      console.log(payload.key);
      const lpRef = doc(firestore, "learn-progress", payload);
      await updateDoc(lpRef, {
        answerNeeded: false,
      });
    },
  },
  modules: {},
  getters: {
    //<-CURRENT USER->
    getCurrentUser(state) {
      return state.currentUser;
    },
    getCurrentUserRole(state) {
      return state.currentUserRole;
    },
    getCurrentUserName(state) {
      return state.currentUserName;
    },
    getCurrentUserScreenname(state) {
      return state.currentUserScreenname;
    },
    getCurrentUserEmail(state) {
      return state.currentUserEmail;
    },
    getCurrentUserGitURL(state) {
      return state.currentUserGitURL;
    },
    getCurrentUserID(state) {
      return state.currentUserID;
    },
    getCurrentUserToken(state) {
      return state.currentUserToken;
    },
    getCurrentUserScheduleURL(state) {
      return state.currentUserScheduleURL;
    },
    getUserLoginState(state) {
      return state.userLoginState;
    },
    //<-ISSUES-ANALYZE->
    getCurrentIssue(state) {
      return state.currentIssue;
    },
    getIssuesInfo(state) {
      return state.issuesInfo;
    },
    //<-StudentList & Profile->
    getStudentIssuesCounter(state) {
      return state.studentIssuesCounter;
    },
    getStudentReposCounter(state) {
      return state.studentReposCounter;
    },
    getspUser(state) {
      return state.spUser;
    },
    getAllStudents(state) {
      return state.allStudents;
    },
    //<-AMA-TOOL->
    getUserQuestions(state) {
      return state.spUserQuestions;
    },
    getQuestionFilterStatus(state) {
      return state.questionFilterStatus;
    },
    getUsersVotedQuestion(state) {
      return state.usersVotedQuestion;
    },
    getAllQuestions(state) {
      return state.allQuestions;
    },
    getSingleQuestion(state) {
      return state.singleQuestion;
    },

    //<-ROTI-TOOL->
    getUserRotis(state) {
      return state.userRotis;
    },

    //<-Learn-Progress->
    getStudentLP(state) {
      return state.studentLP;
    },
    getTeacherLP(state) {
      return state.teacherLP;
    },
    getCurrentLP(state) {
      return state.currentLP;
    },
  },
});
