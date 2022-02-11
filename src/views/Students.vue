<template>
  <div class="containerOuter">
    <h1>Students</h1>
    <h2>Your fellow students</h2>
    <div>
      <div class="containerSearch">
        <input
          class="inputFieldSearch"
          type="text"
          value=""
          placeholder="Find Student by name"
          @input="setSearchString($event)"
        /><button class="buttonSearch" @click="searchStudent()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </button>
      </div>
      <h3>Filter:</h3>
      <div class="containerFilter">
        <select
          name="filterBootcampClass"
          id="filterClass"
          @change="changeFilter('class', $event)"
        >
          <option value="all" selected>Klasse</option>
          <option
            v-for="studentClass in studentsClass"
            :key="studentClass.classId"
            :value="studentClass.classId"
          >
            {{ studentClass.studentsClassName }}
          </option>
        </select>
        <select
          name="filterStudentStatus"
          id="filterStatus"
          @change="changeFilter('fulltime', $event)"
        >
          <option value="all">Voll-/Teilzeit</option>
          <option value="fullTime">Vollzeit</option>
          <option value="partTime">Teilzeit</option>
        </select>
        <select
          name="filterStudentStarttime"
          id="filterStarttime"
          @change="changeFilter('startTime', $event)"
        >
          <option value="all">Startzeitpunkt</option>
          <option
            v-for="studentStartTime in studentsStartTimes"
            :key="studentStartTime.startTimeId"
            :value="studentStartTime.startTimeId"
          >
            {{ studentStartTime.startTimeValue }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <ul class="listStudents">
        <li v-for="student in studentsListFilter" :key="student.studentId">
          <figure class="studentPortraitContainer">
            <div
              class="studentPortraitContainerInner"
              v-if="student.studentGithubPortrait !== ''"
            >
              <img :src="student.studentGithubPortrait" alt="xx" />
            </div>
            <div class="studentPortraitContainerInner containerNoImage" v-else>
              <!--<svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="currentColor"
                class="bi bi-x-square"
                viewBox="0 0 16 16"
              >
                <path
                  d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                />
                <path
                  d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
              </svg>-->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                />
              </svg>
            </div>
          </figure>
          <div class="studentTextContainer">
            <p class="studentTopContainer">
              [
              <span v-if="student.studentRelClass > 0"
                >Class: {{ getStudentClassName(student.studentRelClass) }}</span
              >
              <span v-else>Keine Klasse</span>
              ]
            </p>
            <h3>{{ setStudentNameTogether(student.studentId) }}</h3>
            <p>
              <a
                href="{{student.studentGithubLink}}"
                target="_blank"
                rel="noopener noreferrer"
                :title="
                  'Zum Github-Profil von ' +
                  setStudentNameTogether(student.studentId)
                "
                >{{ student.studentGithubLink }}</a
              >
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Students",
  created() {
    this.studentsListFilter = this.studentsListAll;
    console.log("Filter studs: ", this.studentsListFilter);
  },
  data() {
    return {
      filterOptions: [
        {
          fulltime: "all",
          startTime: "all",
          class: "all",
        },
      ],
      studentsListAll: [
        {
          studentId: 1,
          studentNameFirst: "Justus",
          studentNameSecond: "Siebert",
          studentClass: "2021 November",
          studentRelClass: 1,
          studentRelStarttime: 1,
          studentFulltime: true,
          studentStartTime: "2021-11-02",
          studentGithubLink: "https://github.com/justussiebert",
          studentGithubPortrait:
            "https://avatars.githubusercontent.com/u/93530884?v=4",
        },
        {
          studentId: 2,
          studentNameFirst: "Dmitri",
          studentNameSecond: "Kolesnikov",
          studentClass: "2021 November",
          studentRelClass: 1,
          studentRelStarttime: 1,
          studentFulltime: true,
          studentStartTime: "2021-11-02",
          studentGithubLink: "https://github.com/dimi",
          studentGithubPortrait: "",
        },
        {
          studentId: 3,
          studentNameFirst: "Katharina",
          studentNameSecond: "DiMedici",
          studentClass: "2022 Januar",
          studentRelClass: 2,
          studentRelStarttime: 2,
          studentFulltime: true,
          studentStartTime: "2022-01-02",
          studentGithubLink: "https://github.com/kata",
          studentGithubPortrait: "",
        },
        {
          studentId: 4,
          studentNameFirst: "Sophie",
          studentNameSecond: "Testmeyer",
          studentClass: "2022 Januar",
          studentRelClass: 0,
          studentRelStarttime: 3,
          studentFulltime: false,
          studentStartTime: "2022-01-02",
          studentGithubLink: "https://github.com/sophie",
          studentGithubPortrait: "",
        },
        {
          studentId: 5,
          studentNameFirst: "Sabine",
          studentNameSecond: "Leutheusser-Schnarrenberger",
          studentClass: "2022 Januar",
          studentRelClass: 1,
          studentRelStarttime: 1,
          studentFulltime: false,
          studentStartTime: "2021-11-02",
          studentGithubLink: "https://github.com/sabine",
          studentGithubPortrait: "",
        },
        {
          studentId: 6,
          studentNameFirst: "Mikis",
          studentNameSecond: "Epameinondasias",
          studentClass: "2022 Januar",
          studentRelClass: 1,
          studentRelStarttime: 1,
          studentFulltime: false,
          studentStartTime: "2021-11-02",
          studentGithubLink: "https://github.com/mikis",
          studentGithubPortrait: "",
        },
      ],
      studentSearchString: "",
      studentsListFilter: [],
      studentsClass: [
        {
          classId: 1,
          studentsClassName: "November 2021",
        },
        {
          classId: 2,
          studentsClassName: "Januar 2022",
        },
      ],
      studentsStartTimes: [
        {
          startTimeId: 1,
          startTimeValue: "2021-11-02",
        },
        {
          startTimeId: 2,
          startTimeValue: "2022-01-02",
        },
        {
          startTimeId: 3,
          startTimeValue: "2021-12-01",
        },
      ],
    };
  },
  methods: {
    setSearchString(e) {
      this.studentSearchString = e.target.value;
      //console.log("Suchstring: ", e.target.value);
    },
    searchStudent() {
      /*
      let studentsTmp = this.studentsListFilter.filter(
        (student) => student.studentNameFirst === this.studentSearchString
      );
      console.log("Student: ", studentsTmp);
      */

      //this.studentSearchString = "";
      this.renderStudentsList();
    },
    setStudentNameTogether(id) {
      const student = this.getStudentData(id);
      const nameComplete =
        student.studentNameFirst + " " + student.studentNameSecond;
      return nameComplete;
    },
    getStudentData(idStudent) {
      //console.log("id: ", idStudent);
      const studentData = this.studentsListAll.find(
        (id) => id.studentId === Number(idStudent)
      );
      return studentData;
    },
    getStudentClassData(idClass) {
      const classData = this.studentsClass.find(
        (id) => id.classId === Number(idClass)
      );
      return classData;
    },
    getStudentClassName(idClass) {
      console.log("class id: ", idClass);
      const classData = this.getStudentClassData(idClass);
      const className = classData.studentsClassName;
      return className;
    },

    changeFilter(key, e) {
      //console.log("Wert: ", e.target.value, " Key: ", key);
      //console.log("State: ", this.filterOptions[0][key]);
      this.filterOptions[0][key] = e.target.value;
      //console.log("State starttime: ", this.filterOptions[0][key]);
      this.renderStudentsList();
    },

    renderStudentsList() {
      let studentsTmp = this.studentsListAll;
      // begin filter: status fulltime / parttime

      if (this.filterOptions[0].fulltime === "all") {
        //
      } else if (this.filterOptions[0].fulltime === "fullTime") {
        studentsTmp = this.studentsListAll.filter(
          (student) => student.studentFulltime === true
        );
      } else if (this.filterOptions[0].fulltime === "partTime") {
        studentsTmp = this.studentsListAll.filter(
          (student) => student.studentFulltime === false
        );
      }
      console.log("Filter class: ", this.filterOptions[0].class);
      // end filter: status fulltime / parttime
      // begin filter: class
      if (this.filterOptions[0].class === "all") {
        //studentsTmp = this.studentsListFilter;
      } else {
        const classId = Number(this.filterOptions[0].class);
        //console.log("Class value: ", classId);

        studentsTmp = studentsTmp.filter(
          (student) => student.studentRelClass === classId
        );
      }
      // end filter: class
      // begin filter: starttime
      if (this.filterOptions[0].startTime === "all") {
        //studentsTmp = this.studentsListFilter;
      } else {
        const startId = Number(this.filterOptions[0].startTime);
        //console.log("starttime value: ", startId);

        studentsTmp = studentsTmp.filter(
          (student) => student.studentRelStarttime === startId
        );
      }
      // end filter: starttime
      // begin: search
      /*
      if (this.studentSearchString !== "") {
        studentsTmp = studentsTmp.filter(
          (student) => student.studentNameFirst === this.studentSearchString
        );
      }
*/
      if (this.studentSearchString !== "") {
        const searchString = this.studentSearchString;
        studentsTmp = studentsTmp.filter(function (e) {
          const firstName = e.studentNameFirst;
          const secondName = e.studentNameSecond;
          //if (firstName === searchString) {
          if (
            firstName.includes(searchString) ||
            secondName.includes(searchString)
          ) {
            return true;
          }
        });
      }
      // end: search

      console.log("Students tmp: ", studentsTmp);
      this.studentsListFilter = studentsTmp;
      //console.log("Students state: ", this.studentsListFilter);
      return studentsTmp;
    },
  },
  watch: {},
  computed: {},
};
</script>

<style>
body {
  height: auto;
}
h1 {
  text-transform: uppercase;
}
.containerOuter {
  padding: 5vmin;
}
.containerFilter {
  display: flex;
  gap: 2vmin;
}

ul.listStudents {
  list-style: none;
  padding-left: 0;
}
ul.listStudents li {
  box-shadow: 1px 1px 9px 1px #c4c4c4;
  border-radius: 5px;
  padding: 3vmin;
  display: flex;
  margin-bottom: 3vmin;
}
ul.listStudents a {
  color: #999;
  transition: color 0.6s linear;
}
ul.listStudents a:hover {
  color: violet;
}
ul.listStudents li h3,
ul.listStudents li p {
  margin-top: 0;
  padding: 0;
}
ul.listStudents li p {
  margin-bottom: 0;
}
ul.listStudents li h3 {
  margin-bottom: 0.5vmin;
}

.studentPortraitContainer {
  margin: 0 3vmin 0 0;
  min-width: 120px;
  max-width: 120px;
}
.studentPortraitContainerInner {
  width: 100%;
  line-height: 0;
  font-size: 0;
}
.studentTextContainer {
  flex-grow: 2;
}

ul.listStudents li p.studentTopContainer {
  text-align: right;
  margin-bottom: 1.4vmin;
}
.containerNoImage svg {
  color: #999;
}
/*
.containerNoImage {
  position: relative;
  width: 100%;
}
.containerNoImage::before {
  content: "\F629";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
*/
.studentPortraitContainer img {
  max-width: 100%;
  height: auto;
}
.containerSearch {
  display: flex;
  border: 2px solid #262626;
  border-radius: 3px;
}
.inputFieldSearch,
.buttonSearch {
  border: none;
}
.inputFieldSearch {
  flex-grow: 2;
  padding: 1vmin;
}
.buttonSearch {
  padding-left: 2vmin;
  padding-right: 2vmin;
  cursor: pointer;
}
</style>
