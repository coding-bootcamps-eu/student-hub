import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

try {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
  });
} catch (e) {
  console.log("Error while removing old service worker registrations: ", e);
}

const app = createApp(App).use(store).use(router);
// if (import.meta.env.NODE_ENV) {
//   require("dotenv").config();
// }

app.mount("#app");
