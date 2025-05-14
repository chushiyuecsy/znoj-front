import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import router from "./router";
import store from "./store";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import "@/access/index";
import "bytemd/dist/index.css";

// createApp(App).use(ArcoVue).use(store).use(router).mount("#app");

const app = createApp(App);
app.use(ArcoVue).use(store).use(router).mount("#app");

app.use(ArcoVueIcon);