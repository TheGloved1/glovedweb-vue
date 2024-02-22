/** @format */

import { createApp } from "vue";
import VueObserveVisibility from "vue-observe-visibility";
import App from "./App.vue";

const app = createApp(App);
app.use(VueObserveVisibility);
app.mount("#app");
