<template>
  <section class="lr__recordig-section" id="recordings">
    <h2>Recordings</h2>

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
    </ul> -->
  </section>
</template>
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

<style lang="css" scoped></style>
