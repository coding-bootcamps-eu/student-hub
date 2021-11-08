<template>
  <section class="lr__recordig-section">
    <h2 class="mobile-heading">Lesson Recordings</h2>
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
</template>
<script>
import firestore from "@/firestore";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import LRListElement from "@/components/LRRecordingList/LRListElement";
import LRFilter from "./LRFilter.vue";
export default {
  name: "LRRecordingList",
  data() {
    return {
      lrRecordingsArray: [],
      userFilterQuery: "",
    };
  },
  components: {
    LRListElement,
    LRFilter,
  },
  computed: {
    filteredRecordings: function () {
      let recordingFilterStatus = this.userFilterQuery;
      return this.lrRecordingsArray.filter((recording) => {
        return (
          recording.recordingData.topic.includes(recordingFilterStatus) ||
          recording.recordingData.description.includes(recordingFilterStatus)
        );
      });
    },
  },
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
      if (a.recordingData.date < b.recordingData.date) return -1;
      if (a.recordingData.date > b.recordingData.date) return 1;
      return 0;
    },
    generateDateString(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let year = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if (minutes.toString().length === 1) {
        let _minutes = minutes + "0";
        minutes = _minutes;
      }
      return `${day}.${month}.${year}, ${hours}:${minutes}`;
    },
    async getAllRecordings() {
      const querySnapshot = await getDocs(
        collection(firestore, "zoom-recordings")
      );
      querySnapshot.forEach((doc) => {
        let recordingDate = this.generateDateString(new Date(doc.data().date));
        let rfdurl = [];
        if (doc.data().recordingFilesDownloadUrl.includes(",")) {
          let urls = doc.data().recordingFilesDownloadUrl.split(",");
          urls.forEach((url) => {
            rfdurl.push(url);
          });
        } else {
          rfdurl.push(doc.data().recordingFilesDownloadUrl);
        }
        let rfpurl = [];
        if (doc.data().recordingFilesPlayUrl.includes(",")) {
          let urls = doc.data().recordingFilesPlayUrl.split(",");
          urls.forEach((url) => {
            rfpurl.push(url);
          });
        } else {
          rfpurl.push(doc.data().recordingFilesPlayUrl);
        }
        let surl = [];
        if (doc.data().shareUrl.includes(",")) {
          let urls = doc.data().shareUrl.split(",");
          urls.forEach((url) => {
            surl.push(url);
          });
        } else {
          surl.push(doc.data().shareUrl);
        }
        this.lrRecordingsArray.push({
          recordingKey: doc.id,
          recordingData: {
            date: recordingDate,
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
      this.lrRecordingsArray = this.lrRecordingsArray
        .slice(0)
        .sort(this.compareDates);
    },
  },
  async mounted() {
    await this.getAllRecordings();
  },
};
</script>

<style lang="scss" scoped>
.lr__recordig-section {
  margin: 0 4rem 0 2.5rem;
}
.lr__recording-list {
  list-style-type: none;
  display: grid;
  gap: 0.5rem;
  padding: 0;
}
.lr__recording-list > li {
  display: grid;
}

.lr__recording-list > li:nth-child(1n + 1) {
  background: var(--background-color);
}
.lr__recording-list > li:nth-child(2n + 2) {
  background: var(--light-grey);
}

.filter-wrapper {
  min-width: 33%;
}

@media screen and (max-width: 555px) {
  .lr__recording-list {
    padding: 0.125rem;
  }
}
</style>
