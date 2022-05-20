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
      // 發api時間點修改
      {
        path: "/Info",
        name: "Info",
        component: () => import("@/views/Info.vue"),
        // beforeEnter: async (to, from) => {
        //   console.log("從", from.name, "到", to.name);/
        //   // try {
        //   //   await store.dispatch("getDataBase");
        //   //   return true;
        //   // } catch (error) {
        //   //   console.log(error);
        //   //   return false;
        //   // }
        // },
      },
      {
        path: "/MonthlyRecord/",
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
