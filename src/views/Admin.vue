<template>
  <button @click="loadDocuments">Load</button>
  <button @click="deleteDocuments">Delete Documents</button>
  <br />
  <input type="text" v-model="field" />
  <input type="text" v-model="condition" />
  <input type="text" v-model="conditionValue" />
  <h2>Documents found: {{ documents.length }}</h2>
  <ul>
    <li v-for="document in documents" :key="document.id">
      <pre>{{ document }}</pre>
    </li>
  </ul>
</template>

<script>
import firestore from "@/firestore";
import {
  collection,
  getDocs,
  doc,
  where,
  deleteDoc,
  query,
} from "firebase/firestore";

export default {
  name: "Admin",
  data: () => {
    return {
      documents: [],
      field: "",
      condition: "==",
      conditionValue: "",
    };
  },
  methods: {
    deleteDocuments() {
      const l = this.documents.length;
      const deletePromises = [];
      for (let i = 0; i < l; i++) {
        const document = this.documents[i];
        setTimeout(() => {
          deletePromises.push(
            deleteDoc(doc(firestore, "zoom-recordings", document.id))
          );
        }, 50);
      }

      Promise.all(deletePromises).then(() => {
        this.documents = [];
      });
    },

    async loadDocuments() {
      const querySnapshot = await getDocs(
        query(
          collection(firestore, "zoom-recordings"),
          where(this.field, this.condition, this.conditionValue)
        )
      );
      this.documents.length = 0;
      querySnapshot.forEach((doc) => {
        const document = doc.data();
        document.id = doc.id;
        this.documents.push(document);
      });
    },
  },
};
</script>
