<template>
  <section class="content-container">
    <PageHeader
      title="Recordings"
      sub="Watch live sessions, coaching and more"
    />

    <div class="recording-filter">
      <label for="name">Class:</label>
      <select
        class="select__classes"
        name="classes"
        @change="loadSelectedClass"
        v-model="key"
      >
        <option value="">Last Recordings</option>
        <option value="Live-Session Coaching">Coaching</option>
        <option value="Live-Session Class 2023 Oktober">Oktober 2023</option>
        <option value="Live-Session Class 2023 Dezember">Dezember 2023</option>
        <option value="Live-Session Class 2024 Januar">Januar 2024</option>
        <option value="Live-Session Class 2024 Februar">Februar 2024</option>
        <option value="Live-Session Teilzeit">Live-Session Teilzeit</option>
        <option value="Abschlusspräsentation">Abschlusspräsentation</option>
      </select>
      <label for="name">Topic:</label
      ><select class="select__classes" name="classes" v-model="selectedTopic">
        <option value="">Any Topic</option>
        <option v-for="topic in scheduleTopics" :value="topic" :key="topic">
          {{ topic }}
        </option>
      </select>
    </div>
    <article class="recordings__grid">
      <article
        class="recording__card card card-accent"
        v-for="recording in recordings"
        :key="recording.recordingKey"
      >
        <section class="recording__data">
          <div class="recording__title">
            <p class="recording__info-text">
              {{ recording.recordingData.topic }}
            </p>
          </div>
          <p class="recording__info-text timestamp">
            {{ recording.recordingData.date }},
            {{ recording.recordingData.time }}
          </p>
          <select
            name="scheduleTopic"
            id=""
            v-model="recording.recordingData.scheduleTopic"
            @input="updateRecordingTopic(recording, $event.target.value)"
            v-if="this.$store.getters.isTeacher"
          >
            <option value="-">-</option>
            <option v-for="topic in scheduleTopics" :value="topic" :key="topic">
              {{ topic }}
            </option>
          </select>
          <p class="topic" v-if="this.$store.getters.isStudent">
            {{ recording.recordingData.scheduleTopic }}
          </p>
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
    </article>
    <div class="to-top">
      <a class="to-top" href="#">
        <svg
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
          />
        </svg>
      </a>
    </div>
  </section>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import { fullTimeSchedule } from "../schedule/schedule.js";
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
      scheduleTopic: "",
      scheduleTopics: [],
    };
  },

  created() {
    // Always load latest recordings --> standard use case
    this.loadLastestRecordings();
    this.loadScheduleTopics();
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
  },
  methods: {
    async updateRecordingTopic(recording, scheduleTopic) {
      const data = recording.doc.data();
      data.scheduleTopic = scheduleTopic;

      await updateDoc(recording.doc.ref, data);
    },

    loadScheduleTopics() {
      this.schedule = fullTimeSchedule;

      for (const module of this.schedule) {
        for (const category of module.categories) {
          this.scheduleTopics.push(category.title);
        }
      }

      this.scheduleTopics = [
        ...this.scheduleTopics,
        "Abschlusspräsentation",
        "Coaching",
        "Sonstiges",
      ];
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
        const recordingDate = recordingDateTime.toLocaleDateString("de-DE", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
        const recordingTime = recordingDateTime.toLocaleTimeString("de-DE", {
          hour: "2-digit",
          minute: "2-digit",
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

<style scoped>
.content-container {
  container-type: inline-size;
  container-name: content;
}

.select__classes {
  border: 0.75px solid #262626;
  border-radius: 0.25rem;
  background-color: transparent;
  padding: 0.25rem 0.5rem;
}

.recording__card {
  margin-bottom: 1rem;
}

.recording__title {
  font-size: 125%;
  font-weight: 600;
}

.topic {
  margin-block: var(--s-large);
}

.recording__download {
  margin-top: var(--s-large);

  display: flex;
  gap: var(--s-base);
}

.recording__button {
  background-color: var(--clr-white);
  color: var(--clr-accent);
  text-decoration: none;

  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-inner);
}

.to-top {
  color: var(--clr-accent);

  text-align: center;
  margin-top: 2rem;
  margin-right: 1rem;
}

.recording-filter {
  display: grid;
  grid-template-columns: min-content min-content;
  align-items: center;
  grid-gap: 1rem 0.5rem;
  margin-bottom: 2rem;
}

@container content (min-width: 768px) {
  .recordings__grid {
    --columns: 2;

    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: var(--s-base);
  }
}

@container content (min-width: 1400px) {
  .recordings__grid {
    --columns: 3;
  }
}
</style>
