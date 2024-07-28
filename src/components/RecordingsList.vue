<template>
  <section class="recording__container" id="recordings">
    <PageHeader title="Aufnahmen"
      sub="Schau dir nachträglich die Aufzeichnungen von Live Sessions und anderen Veranstaltugnen an" />
    <div class="filter">
      <div class="select-filter__wrapper">
        <form @change="loadSelectedClass" class="filters-wrapper">
          <div>
            <input type="radio" name="filter" id="all-recordings" value="" v-model="key">
            <label for="all-recordings">Letzte Aufnahmen</label>
          </div>
          <div v-for="recording of recordingTypes" :key="recording.id">
            <input type="radio" name="filter" :id="recording.id" :value="recording.value" v-model="key">
            <label :for="recording.id">{{ recording.title }}</label>
          </div>
        </form>
      </div>
      <div class="select-filter__wrapper">
        <label for="name">Nach Thema filtern:</label>
        <select class="select__classes" name="classes" v-model="selectedTopic">
          <option value="">Alle Themen</option>
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
          <th scope="col">Datum</th>
          <th scope="col">Zeit</th>
          <th scope="col">Thema</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recording in recordings" :key="recording.recordingKey">
          <th scope="row">{{ recording.recordingData.topic }}</th>
          <td>{{ recording.recordingData.date }}</td>
          <td>{{ recording.recordingData.time }}</td>
          <td>
            <span class="recording__date-time-text" v-if="this.$store.getters.isTeacher">
              <select name="scheduleTopic" id="" v-model="recording.recordingData.scheduleTopic"
                @input="updateRecordingTopic(recording, $event.target.value)">
                <option value="-">-</option>
                <option v-for="topic in scheduleTopics" :value="topic" :key="topic">
                  {{ topic }}
                </option>
              </select>
            </span>
            <span class="recording__date-time-text" v-if="this.$store.getters.isStudent">
              {{ recording.recordingData.scheduleTopic }}
            </span>
          </td>
          <td>
            <AccentButton title="Video" :to="recording.recordingData.shareUrl">
              <PlayIcon color="white" />
            </AccentButton>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
import PlayIcon from "@/components/icons/PlayIcon.vue";
import AccentButton from "@/components/AccentButton.vue";
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
    PlayIcon,
    AccentButton
  },
  data() {
    return {
      latestRecordings: [],
      filteredRecordings: [],
      key: "",
      selectedTopic: "",
      recordingTypes: [
        {
          title: "Teilzeit",
          value: "Live-Session Teilzeit",
          id: "part-time"
        },
        {
          title: "VZ Mai 2024",
          value: "Live-Session Class 2024 Mai",
          id: "vz-mai-24"
        },
        {
          title: "VZ Juni 2024",
          value: "Live-Session Class 2024 Juni",
          id: "vz-jun-24"
        },
        {
          title: "Abschlusspräsentationen",
          value: "Abschlusspräsentation",
          id: "abschluss"
        }
      ]
    };
  },
  created() {
    // Always load latest recordings --> standard use case
    this.loadlatestRecordings();
  },
  computed: {
    recordings() {
      const currentRecordings = [];

      if (this.key === "") {
        currentRecordings.push(...this.latestRecordings);
      } else {
        currentRecordings.push(...this.filteredRecordings);
      }
      if (this.selectedTopic !== "") {
        return currentRecordings.filter(
          (r) => r.recordingData.scheduleTopic === this.selectedTopic
        );
      }
      return currentRecordings;
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
    async loadlatestRecordings() {
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
      this.latestRecordings = latestRecordings;
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

  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.filters-wrapper {
  display: flex;
}

.filters-wrapper input {
  all: unset;

  position: absolute;
}

.filters-wrapper label {
  color: var(--clr-accent);

  display: inline-block;
  padding: .25rem .75rem;
  border-block: 2px solid var(--clr-accent);
}

.filters-wrapper div:first-of-type label {
  border-left: 2px solid var(--clr-accent);
  border-radius: .25rem 0 0 .25rem;
}

.filters-wrapper div:last-of-type label {
  border-right: 2px solid var(--clr-accent);
  border-radius: 0 .25rem .25rem 0;
}

.filters-wrapper input:checked+label {
  background-color: var(--clr-accent);
  color: var(--clr-white);
}

.filters-wrapper input:focus-visible+label {
  outline: 2px solid black;
}

.select-filter__wrapper {
  display: flex;
  align-items: center;
  gap: var(--s-base);
}

.filter label {
  font-weight: 700;
}

.filter select {
  background-color: var(--clr-accent);
  color: var(--clr-white);
  font-weight: 700;

  padding: var(--s-xs);
  border: none;
  border-radius: .25rem;
}

td a {
  background-color: var(--clr-accent);
  color: var(--clr-accent-light);
  text-decoration: none;

  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-inner);
}

@media screen and (min-width: 768px) {

  table {
    border-radius: var(--radius-inner);
  }
}
</style>
