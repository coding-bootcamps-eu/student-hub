<template>
  <section>
    <PageHeader
      title="Aufnahmen"
      sub="Schau dir nachträglich die Aufzeichnungen von Live Sessions an" />
    <div>
      <form
        @change="loadSelectedClass"
        class="
          flex flex-wrap
          md:flex-nowrap
          gap-2
          bg-violet-100
          p-2
          rounded-xl
        ">
        <div>
          <input
            type="radio"
            name="filter"
            id="all-recordings"
            :class="radioClasses"
            value=""
            v-model="key" />
          <label
            for="all-recordings"
            class="py-1 px-3 inline-block border-2 border-violet-700 rounded"
            :class="labelClasses"
            >Letzte Aufnahmen</label
          >
        </div>
        <div v-for="recording of recordingTypes" :key="recording.id">
          <input
            type="radio"
            name="filter"
            :id="'class-' + recording.id"
            :class="radioClasses"
            :value="recording.value"
            v-model="key" />
          <label :for="'class-' + recording.id" :class="labelClasses">{{
            recording.title
          }}</label>
        </div>
      </form>
    </div>
    <div class="my-4 grid grid-cols-1 gap-4">
      <article
        v-for="recording in recordings"
        :key="recording.recordingKey"
        class="bg-indigo-100 rounded p-4">
        <h3 class="font-bold text-indigo-700 text-xl">
          {{ recordingTopic(recording, recording.recordingData.partTimeClass) }}
          <select
            name="part-time-class"
            id="part-time-class"
            v-if="
              recording.recordingData.topic.includes('Teilzeit') &&
              this.$store.getters.isTeacher
            "
            @input="updatePartTimeClass(recording, $event.target.value)"
            v-model="recording.recordingData.partTimeClass">
            <option :value="null">Bitte wählen</option>
            <option
              :value="currentClass"
              v-for="currentClass of partTimeClasses">
              {{ currentClass }}
            </option>
          </select>
        </h3>
        <div class="flex gap-2 text-xs text-indigo-400">
          <span>{{ recording.recordingData.date }}</span>
          <span>{{ recording.recordingData.time }}</span>
        </div>
        <div class="flex gap-2 mt-4">
          <AccentButton
            :to="getNotes(recording)"
            title="GitHub"
            v-if="getNotes(recording)">
            <GitHubIcon style="width: 1rem" />
          </AccentButton>
          <AccentButton title="Video" :to="recording.recordingData.shareUrl">
            <PlayIcon />
          </AccentButton>
        </div>
      </article>
    </div>
  </section>
</template>
<script>
import PageHeader from "@/components/PageHeader.vue";
import PlayIcon from "@/components/icons/PlayIcon.vue";
import GitHubIcon from "@/components/icons/GitHubIcon.vue";
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
    GitHubIcon,
    AccentButton,
  },
  data() {
    return {
      radioClasses: `
        absolute 
        -top-[1000%]
        [&:checked+label]:bg-violet-700
        [&:checked+label]:text-white
      `,
      labelClasses: `
        py-1 px-3 inline-block border-2 border-violet-700 rounded
      `,
      latestRecordings: [],
      filteredRecordings: [],
      key: "",
      selectedTopic: "",
      recordingTypes: [
        {
          title: "Teilzeitklassen",
          value: "Live-Session Teilzeit",
          id: "part-time",
        },
        {
          title: "VZ Mai 24",
          value: "Live-Session Class 2024 Mai",
          id: "2024-05",
        },
        {
          title: "VZ Juni 24",
          value: "Live-Session Class 2024 Juni",
          id: "2024-06",
        },
        {
          title: "Präsentationen",
          value: "Abschlusspräsentation",
          id: "abschluss",
        },
      ],
      partTimeClasses: [
        "2023 Dezember",
        "2024 Februar",
        "2024 März",
        "2024 Mai",
      ],
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
  },
  methods: {
    recordingTopic(rec, partTimeClass) {
      const topic = rec.recordingData.topic;

      if (topic.includes("Abschlusspräsentation")) return topic;

      let prefix = "";
      let year = "";
      let month = "";

      if (topic.includes("Class")) {
        prefix = "VZ";
        year = topic.split(" ")[2];
        month = topic.split(" ")[3];
      }

      if (topic.includes("Teilzeit")) {
        prefix = "TZ";

        if (partTimeClass) {
          year = partTimeClass.split(" ")[0];
          month = partTimeClass.split(" ")[1];
        }
      }

      return `${prefix} ${year} ${month}`;
    },

    getNotes(rec) {
      if (rec.recordingData.topic.includes("Abschlusspräsentation"))
        return false;
      if (
        rec.recordingData.topic.includes("Teilzeit") &&
        rec.recordingData.partTimeClass === undefined
      )
        return false;

      const months = {
        Januar: "01",
        Februar: "02",
        März: "03",
        April: "04",
        Mai: "05",
        Juni: "06",
        Juli: "07",
        August: "08",
        September: "09",
        Oktober: "10",
        November: "11",
        Dezember: "12",
      };

      const baseUrl = "https://github.com/coding-bootcamps-eu/";

      const isPartTime = rec.recordingData.topic.includes("Teilzeit");

      if (isPartTime) {
        const topic = rec.recordingData.partTimeClass;
        const year = topic.split(" ")[0];
        const month = topic.split(" ")[1];
        const classSlug = `${year}-${months[month]}`;

        let date = rec.recordingData.date.split(".");
        console.log(date);
        date = `${date[2]}-${date[1].length > 1 ? date[1] : "0" + date[1]}-${
          date[0].length > 1 ? date[0] : "0" + date[0]
        }`;
        console.log(date);

        return `${baseUrl}${classSlug}/tree/main/Teilzeit/${date}`;
      }

      const topic = rec.recordingData.topic.replace("Live-Session Class ", "");
      const year = topic.split(" ")[0];
      const month = topic.split(" ")[1];
      const classSlug = `${year}-${months[month]}`;

      let date = rec.recordingData.date.split(".");
      date = `${date[2]}-${date[1].length > 1 ? date[1] : "0" + date[1]}-${
        date[0].length > 1 ? date[0] : "0" + date[0]
      }`;

      return `${baseUrl}${classSlug}/tree/main/Vollzeit/${date}`;
    },

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

    async updatePartTimeClass(recording, chosenClass) {
      if (chosenClass === null) return;

      const data = recording.doc.data();
      data.partTimeClass = chosenClass;

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
          doc.data().partTimeClass
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
          doc.data().partTimeClass
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
      partTimeClass
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
          partTimeClass: partTimeClass,
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
