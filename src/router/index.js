import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/Login",
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/Layout",
    name: "Layout",
    component: () => import("@/views/Layout.vue"),
    redirect: "/Info",
    children: [
      {
        path: "/Info",
        name: "Info",
        component: () => import("@/views/Info.vue"),
        beforeEnter: async (to, from) => {
          try {
            await store.dispatch("getDataBase");
          } catch (error) {
            console.log(error);
          }
          return true;
        },
      },
      {
        path: "/MonthlyRecord",
        name: "MonthlyRecord",
        component: () => import("@/views/MonthlyRecord.vue"),
      },
      {
        path: "/AnnualRecord",
        name: "AnnualRecord",
        component: () => import("@/views/AnnualRecord.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
