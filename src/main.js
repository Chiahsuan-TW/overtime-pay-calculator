import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "ant-design-vue/dist/antd.css";
import "../src/assets/scss/custom/_custom-calendar.scss";
import "../src/assets/scss/custom/_custom-timepicker.scss";
import "../src/assets/scss/custom/_dropDown.scss";
import "@/assets/scss/_reset.scss";

import { DatePicker, TimePicker, Dropdown, Menu } from "ant-design-vue";

createApp(App).use(store).use(router).use(DatePicker).use(TimePicker).use(Dropdown).use(Menu).mount("#app");
