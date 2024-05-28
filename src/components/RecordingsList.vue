<template>
  <section class="recording__container" id="recordings">
    <PageHeader
      title="Recordings"
      sub="Watch recordings to live sessions and other events even after they happened"
    />
    <div class="filter">
      <div class="select-filter__wrapper">
        <label for="name">Class:</label>
        <select
          class="select__classes"
          name="classes"
          @change="loadSelectedClass"
          v-model="key"
        >
          <option value="">Last Recordings</option>
          <option value="Live-Session Coaching">Coaching</option>
          <option value="Wochenabschluss">Wochenabschluss</option>
          <option value="Live-Session Class 2023 September">
            September 2023
          </option>
          <option value="Live-Session Class 2023 Oktober">Oktober 2023</option>
          <option value="Live-Session Class 2023 Dezember">
            Dezember 2023
          </option>
          <option value="Live-Session Class 2024 Januar">Januar 2024</option>
          <option value="Live-Session Class 2024 Februar">Februar 2024</option>
          <option value="Live-Session Class 2024 Mai">Mai 2024</option>
          <option value="Live-Session Teilzeit">Live-Session Teilzeit</option>
          <option value="Abschlusspräsentation">Abschlusspräsentation</option>
        </select>
      </div>
      <div class="select-filter__wrapper">
        <label for="name">Topic:</label
        ><select class="select__classes" name="classes" v-model="selectedTopic">
          <option value="">Any Topic</option>
          <option v-for="topic in scheduleTopics" :value="topic" :key="topic">
            {{ topic }}
          </option>
        </select>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th scope="col">Event</th>
          <th scope="col">Day</th>
          <th scope="col">Time</th>
          <th scope="col">Topic</th>
          <th scope="col">Video</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recording in recordings" :key="recording.recordingKey">
          <th scope="row">{{ recording.recordingData.topic }}</th>
          <td>{{ recording.recordingData.date }}</td>
          <td>{{ recording.recordingData.time }}</td>
          <td>
            <span
              class="recording__date-time-text"
              v-if="this.$store.getters.isTeacher"
            >
              <select
                name="scheduleTopic"
                id=""
                v-model="recording.recordingData.scheduleTopic"
                @input="updateRecordingTopic(recording, $event.target.value)"
              >
                <option value="-">-</option>
                <option
                  v-for="topic in scheduleTopics"
                  :value="topic"
                  :key="topic"
                >
                  {{ topic }}
                </option>
              </select>
            </span>
            <span
              class="recording__date-time-text"
              v-if="this.$store.getters.isStudent"
            >
              {{ recording.recordingData.scheduleTopic }}
            </span>
          </td>
          <td>
            <a :href="recording.recordingData.shareUrl">Play</a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
import { db } from "@/firebase";
import {
  orderBy,
  query,
  limit,
  collection,
  getDocs,
  where,
  updateDoc,
} from "firebase/firestore";
import { fullTimeSchedule } from "@/schedule/schedule";
export default {
  name: "CBERecordings",
  components: {
    PageHeader,
  },
  data() {
    return {
      lastestRecordings: [],
      filteredRecordings: [],
      key: "",
      selectedTopic: "",
    };
  },
  created() {
    // Always load latest recordings --> standard use case
    this.loadLastestRecordings();
  },
  computed: {
    recordings() {
      let recordings = [];
      if (this.key === "") {
        recordings = this.lastestRecordings;
      } else {
        recordings = this.filteredRecordings;
      }
      if (this.selectedTopic !== "") {
        recordings = recordings.filter(
          (r) => r.recordingData.scheduleTopic === this.selectedTopic
        );
      }
      return recordings;
    },
    scheduleTopics() {
      // Set is used to remove duplicates
      const categories = [];

      fullTimeSchedule.forEach((module) => {
        module.categories.forEach((category) =>
          categories.push(category.title)
        );
      });

      return categories;
    },
  },
  methods: {
    getFormattedDate(date) {
      return date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
    },
    getFormattedTime(date) {
      return date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    async updateRecordingTopic(recording, scheduleTopic) {
      const data = recording.doc.data();
      data.scheduleTopic = scheduleTopic;
      await updateDoc(recording.doc.ref, data);
    },
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
        const recordingDateTime = new Date(doc.data().date);
        const recordingDate = this.getFormattedDate(recordingDateTime);
        const recordingTime = this.getFormattedTime(recordingDateTime);

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
          doc,
          latestRecordings,
          doc.id,
          recordingDate,
          recordingTime,
          rfdurl,
          rfpurl,
          surl,
          doc.data().topic,
          doc.data()["video-files-download-url"],
          doc.data().videoFilesDownloadUrl,
          doc.data().scheduleTopic
        );
      });
      this.lastestRecordings = latestRecordings;
    },
    async loadSelectedClass() {
      const querySnapshot = await getDocs(
        query(collection(db, "zoom-recordings"), where("topic", "==", this.key))
      );
      let filteredRecordings = [];
      querySnapshot.forEach((doc) => {
        const recordingDateTime = new Date(doc.data().date);
        const recordingDate = this.getFormattedDate(recordingDateTime);
        const recordingTime = this.getFormattedTime(recordingDateTime);
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
          doc,
          filteredRecordings,
          doc.id,
          recordingDate,
          recordingTime,
          rfdurl,
          rfpurl,
          surl,
          doc.data().topic,
          doc.data()["video-files-download-url"],
          doc.data().videoFilesDownloadUrl,
          doc.data().scheduleTopic
        );
      });
      this.filteredRecordings = filteredRecordings;
      this.sortArrayDate(this.filteredRecordings);
    },
    saveRecordings(
      doc,
      elem,
      id,
      date,
      time,
      recDown,
      recPlay,
      share,
      topic,
      vFilesDownOne,
      vFilesDownTwo,
      scheduleTopic
    ) {
      elem.push({
        doc: doc,
        recordingKey: id,
        recordingData: {
          date: date,
          time: time,
          recordingFilesDownloadUrl: recDown,
          recordingFilesPlayUrl: recPlay,
          shareUrl: share,
          topic: topic,
          videoFilesDownloadUrl: vFilesDownOne || vFilesDownTwo,
          scheduleTopic: scheduleTopic,
        },
      });
    },
    sortArrayDate(elem) {
      elem.sort(function (a, b) {
        const splitDateA = a.recordingData.date.split(".");
        const dateObjA = {
          day: splitDateA[0],
          month: splitDateA[1],
          year: splitDateA[2],
        };

        const splitDateB = b.recordingData.date.split(".");
        const dateObjB = {
          day: splitDateB[0],
          month: splitDateB[1],
          year: splitDateB[2],
        };

        const dateA = new Date(
          `${dateObjA.month}-${dateObjA.day}-${dateObjA.year}`
        );
        const dateB = new Date(
          `${dateObjB.month}-${dateObjB.day}-${dateObjB.year}`
        );
        /*         const dateA = new Date(a.recordingData.date.replaceAll(".", "-"));
        console.log(dateA);
        const dateB = new Date(b.recordingData.date.replaceAll(".", "-"));
        console.log(dateB); */
        return dateA < dateB ? 1 : -1;
      });
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
<style scoped>
.filter {
  background-color: var(--clr-accent-light);

  padding: var(--s-base);
  border-radius: var(--radius-outer);
}

.select-filter__wrapper {
  display: flex;
  align-items: center;
  gap: var(--s-base);

  margin-block: var(--s-base);
}

.filter label {
  font-weight: 700;
}

.filter select {
  background-color: var(--clr-background);

  padding: var(--s-xs);
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: var(--radius-outer);
  margin-block: var(--s-large);

  overflow: hidden;
}

th,
td {
  text-align: left;

  padding: var(--s-base);
}

thead {
  background-color: var(--clr-accent);
  color: white;
}

tbody tr:nth-child(odd) {
  background-color: var(--clr-accent-light);
}

tbody tr:nth-child(even) {
  background-color: var(--clr-background);
}

tbody th {
  color: var(--clr-accent);
}

select {
  width: 100%;
}

td a {
  background-color: var(--clr-accent);
  color: var(--clr-accent-light);
  text-decoration: none;

  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-inner);
}

@media screen and (min-width: 768px) {
  table,
  .filter {
    border-radius: var(--radius-inner);
  }
}
</style>
