import router from "./router";
import store from "./store";

import "ant-design-vue/dist/antd.css";
import "@/assets/scss/custom/_custom-calendar.scss";
import "@/assets/scss/custom/_custom-timepicker.scss";
import "@/assets/scss/custom/_dropDown.scss";
import "@/assets/scss/custom/_custom-Popover.scss";
import "@/assets/scss/_reset.scss";
import app from "@/plugin/ant-design.js";

app.use(store).use(router).mount("#app");
