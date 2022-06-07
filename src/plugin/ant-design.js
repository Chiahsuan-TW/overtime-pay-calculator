import { createApp } from "vue";
import App from "@/App.vue";

import {
  DatePicker,
  TimePicker,
  Dropdown,
  Menu,
  Popover,
  Button,
  Modal,
} from "ant-design-vue";

const app = createApp(App)
  .use(DatePicker)
  .use(TimePicker)
  .use(Dropdown)
  .use(Menu)
  .use(Popover)
  .use(Button)
  .use(Modal);

export default app;
