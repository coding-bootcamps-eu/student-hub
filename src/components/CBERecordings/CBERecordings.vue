<template>
  <section class="recording__container" id="recordings">
    <h2 class="recording__container-heading">Recordings</h2>
    <p class="recording__container-subheading">
      Movie Time - watch the live sessions again
    </p>

    <label for="name">Select a Class:</label
    ><select
      class="select__classes"
      name="classes"
      @change="loadSelectedClass"
      v-model="key"
    >
      <option value="">Last Recordings</option>
      <option value="Live-Session Weekly Coding Challenge">
        Weekly Coding Challenge
      </option>
      <option value="Live-Session Coaching">Coaching Live-Session</option>
      <option value="Live-Session Class 2022 April">April 2022</option>
      <option value="Live-Session Class 2022 März">März 2022</option>
      <option value="Live-Session Class 2022 Februar">Februar 2022</option>
      <option value="Live-Session Class 2022 Januar">Januar 2022</option>
    </select>

    <div class="number-of-lessons">
      <template v-if="key">
        <h3>Found Lesson Recordings</h3>
        <h3>{{ this.filteredRecordings.length }}</h3>
      </template>
      <template v-else>
        <h3>Last Lesson Recordings</h3>
        <h3>{{ this.lastestRecordings.length }}</h3>
      </template>
    </div>

    <article
      class="recording__box"
      v-for="recording in recordings"
      :key="recording.recordingKey"
    >
      <section class="recording__data">
        <div class="recording__title">
          <p class="recording__date-time-headings">Title:</p>
          <p class="recording__date-time-text">
            {{ recording.recordingData.topic }}
          </p>
        </div>

        <div class="recording__date-time">
          <div class="recording__date">
            <p class="recording__date-time-headings">Date:</p>
            <p class="recording__date-time-text">
              {{ recording.recordingData.date }}
            </p>
          </div>
          <div class="recording__time">
            <p class="recording__date-time-headings">Time:</p>
            <p class="recording__date-time-text">
              {{ recording.recordingData.time }}
            </p>
          </div>
        </div>
      </section>
      <section class="recording__download">
        <a
          target="_blank"
          :href="recording.recordingData.shareUrl"
          class="recording__button"
          >Play</a
        >
        <a
          :href="recording.recordingData.recordingFilesDownloadUrl[0]"
          class="recording__button"
          >Download</a
        >
      </section>
    </article>
    <div class="to-top">
      <a class="to-top" href="#"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          class="bi bi-arrow-up-circle"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"
          /></svg
      ></a>
    </div>
  </section>
</template>

<script>
import { db } from "../../firebase";
import {
  orderBy,
  query,
  limit,
  collection,
  getDocs,
  where,
} from "firebase/firestore";

export default {
  name: "CBERecordings",
  data() {
    return {
      lastestRecordings: [],
      filteredRecordings: [],
      key: "",
    };
  },

  created() {
    // Always load latest recordings --> standard use case
    this.loadLastestRecordings();
  },
  computed: {
    recordings() {
      if (this.key === "") {
        return this.lastestRecordings;
      } else {
        return this.filteredRecordings;
      }
    },
  },
  methods: {
    async loadLastestRecordings() {
      const queryResult = await getDocs(
        query(
          collection(db, "zoom-recordings"),
          orderBy("date", "desc"),
          limit(10)
        )
      );
      const latestRecordings = [];
      queryResult.forEach((doc) => {
        const recordingDateTime = this.splitDateTime(doc.data().date);
        const recordingDate = recordingDateTime[0];
        const recordingTime = recordingDateTime[1];

        // recording files download
        let rfdurl = [];
        this.urlIncludesComma(doc.data().recordingFilesDownloadUrl, rfdurl);
        // recording files play
        let rfpurl = [];
        this.urlIncludesComma(doc.data().recordingFilesPlayUrl, rfpurl);
        // share url
        let surl = [];
        this.urlIncludesComma(doc.data().shareUrl, surl);

        // add to dom array
        this.saveRecordings(
          latestRecordings,
          doc.id,
          recordingDate,
          recordingTime,
          rfdurl,
          rfpurl,
          surl,
          doc.data().topic,
          doc.data()["video-files-download-url"],
          doc.data().videoFilesDownloadUrl
        );
      });
      this.lastestRecordings = latestRecordings;
    },
    async loadSelectedClass() {
      const querySnapshot = await getDocs(
        query(
          collection(db, "zoom-recordings"),
          where("topic", "==", this.key),
          limit(30)
        )
      );

      let filteredRecordings = [];

      querySnapshot.forEach((doc) => {
        const recordingDateTime = this.splitDateTime(doc.data().date);
        const recordingDate = recordingDateTime[0];
        const recordingTime = recordingDateTime[1];

        // recording files download
        let rfdurl = [];
        this.urlIncludesComma(doc.data().recordingFilesDownloadUrl, rfdurl);
        // recording files play
        let rfpurl = [];
        this.urlIncludesComma(doc.data().recordingFilesPlayUrl, rfpurl);
        // share url
        let surl = [];
        this.urlIncludesComma(doc.data().shareUrl, surl);

        this.saveRecordings(
          filteredRecordings,
          doc.id,
          recordingDate,
          recordingTime,
          rfdurl,
          rfpurl,
          surl,
          doc.data().topic,
          doc.data()["video-files-download-url"],
          doc.data().videoFilesDownloadUrl
        );
      });
      this.filteredRecordings = filteredRecordings;
      this.sortArrayDate(this.filteredRecordings);
    },
    saveRecordings(
      elem,
      id,
      date,
      time,
      recDown,
      recPlay,
      share,
      topic,
      vFilesDownOne,
      vFilesDownTwo
    ) {
      elem.push({
        recordingKey: id,
        recordingData: {
          date: date,
          time: time,
          recordingFilesDownloadUrl: recDown,
          recordingFilesPlayUrl: recPlay,
          shareUrl: share,
          topic: topic,
          videoFilesDownloadUrl: vFilesDownOne || vFilesDownTwo,
        },
      });
    },
    sortArrayDate(elem) {
      elem.sort(function (a, b) {
        const dateA = new Date(a.recordingData.date);
        const dateB = new Date(b.recordingData.date);
        return dateA < dateB ? 1 : -1;
      });
    },
    splitDateTime(elem) {
      elem = elem.replace("T", " ");
      elem = elem.replace("Z", "");
      elem = elem.split(" ");
      return elem;
    },
    urlIncludesComma(docURL, targetArray) {
      if (docURL.includes(",")) {
        let _urls = docURL.split(",");
        _urls.forEach((url) => {
          targetArray.push(url);
        });
      } else {
        targetArray.push(docURL);
      }
    },
  },
};
</script>

<style lang="css" scoped>
*,
*::before,
*:after {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: #262626;
  font-weight: 600;
}
p {
  margin: 0;
}
h3 {
  color: rgba(153, 153, 153, 1);
}
.recording__container {
  padding: 0 0.8rem;
}
.recording__container-heading {
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 0;
}
.recording__container-subheading {
  color: #999999;
  font-weight: 600;
  margin-bottom: 2rem;
}
.select__classes {
  border: 0.75px solid #262626;
  border-radius: 0.25rem;
  background-color: transparent;
  padding: 0.25rem 0.5rem;
  margin: 1rem;
}
.number-of-lessons {
  display: flex;
  justify-content: space-between;
}
.recording__box {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  padding: 1rem;
  border: 1px solid black;
  margin-bottom: 1rem;
  background-color: #e5e5e5;
  border: 1px solid #e5e5e5;
  border-radius: 1rem;
  box-shadow: 1px 1px 9px 1px rgba(166, 166, 166, 0.47);
}
.recording__data {
  display: flex;
  flex-direction: column;
}
.recording__title {
  margin-bottom: 1rem;
}
.recording__date-time {
  display: flex;
  justify-content: space-between;
}
.recording__date-time-headings {
  color: rgba(153, 153, 153, 1);
  font-weight: 400;
}
.recording__date-time-text {
  color: rgba(38, 38, 38, 1);
  font-weight: 600;
}
.recording__download {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}
.recording__button {
  border: 1.75px solid black;
  border-radius: 0.5rem;
  padding: 0.05rem 0.8rem;
}
.bi-file-earmark-arrow-down {
  margin-right: 0.25rem;
}
.to-top {
  text-align: center;
  margin-top: 2rem;
  margin-right: 1rem;
}
</style>
