import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "@/assets/style.css";

try {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
} catch (e) {
  console.error("Error while removing old service worker registrations: ", e);
}

const app = createApp(App).use(createPinia()).use(router);
// if (import.meta.env.NODE_ENV) {
//   require("dotenv").config();
// }

app.mount("#app");
