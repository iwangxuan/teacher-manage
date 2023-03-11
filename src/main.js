/*
 * @Date: 2023-01-31 16:11:18
 * @LastEditTime: 2023-02-10 22:02:09
 */
import { createApp } from "vue";
import App from "./App.vue";
import axios from "./axios";
import "./axios";
import router from "./router";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(ElementPlus);
app.use(axios);
app.mount("#app");
