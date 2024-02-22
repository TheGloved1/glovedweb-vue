/** @format */

import { createApp } from "vue";
import VueObserveVisibility from "vue-observe-visibility";
// const { GoogleGenerativeAI } = require("https://esm.run/@google/generative-ai");
import App from "./App.vue";

const app = createApp(App);
app.use(VueObserveVisibility);
app.mount("#app");
