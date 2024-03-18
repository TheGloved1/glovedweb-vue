/** @format */

import "./assets/tailwind.css";
import { createApp } from "vue";
import VueObserveVisibility from "vue-observe-visibility";
import axios from "axios";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(VueObserveVisibility);
app.use(axios);
app.use(router);
app.mount("#app");
