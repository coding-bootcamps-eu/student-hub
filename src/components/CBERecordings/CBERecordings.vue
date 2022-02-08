<template>
  <section class="lr__recordig-section" id="recordings">
    <h2>Recordings</h2>

    <form>
      <input type="text" placeholder="Search Lesson-Recordings" />
      <button>Search</button>
    </form>

    <h3>Lesson-Recordings</h3>
    <p></p>
    <template
      v-for="recording in lrRecordingsArray"
      :key="recording.recordingKey"
    >
      <article class="recording__box">
        <section class="recording__data">
          <div class="recording__title">
            <p>Title:</p>
            <p>{{ recording.recordingData.topic }}</p>
          </div>

          <div class="recording__date-time">
            <div class="recording__date">
              <p>Date:</p>
              <p>22-01-31</p>
            </div>
            <div class="recording__time">
              <p>Time:</p>
              <p>17:55:30</p>
            </div>
          </div>
        </section>
        <section class="recording__download">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-collection-play"
            viewBox="0 0 16 16"
          >
            <path
              d="M2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1zm2.765 5.576A.5.5 0 0 0 6 7v5a.5.5 0 0 0 .765.424l4-2.5a.5.5 0 0 0 0-.848l-4-2.5z"
            />
            <path
              d="M1.5 14.5A1.5 1.5 0 0 1 0 13V6a1.5 1.5 0 0 1 1.5-1.5h13A1.5 1.5 0 0 1 16 6v7a1.5 1.5 0 0 1-1.5 1.5h-13zm13-1a.5.5 0 0 0 .5-.5V6a.5.5 0 0 0-.5-.5h-13A.5.5 0 0 0 1 6v7a.5.5 0 0 0 .5.5h13z"
            />
          </svg>
          <button>Download</button>
        </section>
      </article>
    </template>
  </section>
</template>

<!--  <h2 class="mobile-heading">Lesson Recordings</h2>
    <div class="filter-wrapper">
      <LRFilter
        @filter-result="getFilterResults"
        filterHeading="Suche nach Titel oder Beschreibung"
        placeholder="Gebe ein Suchbegriff ein..."
      />
    </div>
    <ul class="lr__recording-list" v-if="userFilterQuery">
      <LRListElement
        v-for="recording in filteredRecordings"
        :key="recording.recordingKey"
        :date="recording.recordingData.date"
        :topic="recording.recordingData.topic"
        :description="recording.recordingData.description"
        :playURL="recording.recordingData.recordingFilesPlayUrl"
        :downloadURL="recording.recordingData.recordingFilesDownloadUrl"
        :shareURL="recording.recordingData.recordingFilesPlayUrl"
        @removeRecording="deleteRecording(recording.recordingKey)"
        @addDescription="addDescription(recording.recordingKey)"
        v-bind="recording"
      />
    </ul>
    <ul class="lr__recording-list" v-else>
      <LRListElement
        v-for="recording in lrRecordingsArray"
        :key="recording.recordingKey"
        :date="recording.recordingData.date"
        :topic="recording.recordingData.topic"
        :description="recording.recordingData.description"
        :playURL="recording.recordingData.recordingFilesPlayUrl"
        :downloadURL="recording.recordingData.recordingFilesDownloadUrl"
        :shareURL="recording.recordingData.recordingFilesPlayUrl"
        @removeRecording="deleteRecording(recording.recordingKey)"
        @addDescription="addDescription(recording.recordingKey)"
        v-bind="recording"
      />
    </ul> 
  </section>
</template>-->
<script>
import firestore from "@/firestore";
import {
  limit,
  orderBy,
  query,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export default {
  name: "CBERecordings",
  data() {
    return {
      lrRecordingsArray: [],
      userFilterQuery: "",
    };
  },
  /*  computed: {
    filteredRecordings: function () {
      let recordingFilterStatus = this.userFilterQuery;
      return this.lrRecordingsArray.filter((recording) => {
        return (
          recording.recordingData.topic.includes(recordingFilterStatus) ||
          recording.recordingData.description.includes(recordingFilterStatus)
        );
      });
    },
  },*/
  methods: {
    async addDescription(recordingKey) {
      let _description;
      let description = prompt("Please enter a description", "Description..");
      if (description == null || description == "") {
        _description = "User cancelled the prompt.";
      } else {
        _description = description;
      }
      const recordingRef = doc(firestore, "zoom-recordings", recordingKey);
      await updateDoc(recordingRef, {
        description: _description,
      });
      location.reload();
    },
    async deleteRecording(recordingKey) {
      await deleteDoc(doc(firestore, "zoom-recordings", recordingKey));
      location.reload();
    },
    getFilterResults(result) {
      this.userFilterQuery = result;
    },
    compareDates(a, b) {
      if (a.recordingData.date < b.recordingData.date) return 1;
      if (a.recordingData.date > b.recordingData.date) return -1;
      return 0;
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
    async getAllRecordings() {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, "zoom-recordings"),
          orderBy("date", "desc"),
          limit(12)
        )
      );
      querySnapshot.forEach((doc) => {
        let recordingDate = new Date(doc.data().date);
        let recordingDateAsString = recordingDate.toLocaleString("de-DE", {
          weekday: "long",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
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
        this.lrRecordingsArray.push({
          recordingKey: doc.id,
          recordingData: {
            date: recordingDateAsString,
            recordingFilesDownloadUrl: rfdurl,
            recordingFilesPlayUrl: rfpurl,
            shareUrl: surl,
            topic: doc.data().topic,
            description: doc.data().description,
            uuid: doc.data().uuid,
            videoFilesDownloadUrl:
              doc.data()["video-files-download-url"] ||
              doc.data().videoFilesDownloadUrl,
          },
        });
      });
    },
  },
  async mounted() {
    await this.getAllRecordings();
  },
};
</script>

<style lang="css" scoped>
*,
*::before,
*:after {
  box-sizing: border-box;
}
p {
  margin: 0;
}

button {
  margin-top: 0.5rem;
}

input[type="text"] {
}

.bi-collection-play {
  width: 27px;
  height: 27px;
}

.recording__box {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  padding: 1rem;
  border: 1px solid black;
  margin-bottom: 1rem;
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

.recording__download {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
