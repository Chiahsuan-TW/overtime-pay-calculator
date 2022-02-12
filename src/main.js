import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { DatePicker, Space } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "../src/assets/scss/custom/_custom-calendar.scss";

import "@/assets/scss/_reset.scss";

createApp(App).use(store).use(router).use(DatePicker).use(Space).mount("#app");
