import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "IndexView",
    component: () => import("@/views/IndexView.vue"),
  },
  {
    path: "/home",
    name: "IndexHome",
    component: () => import("@/views/IndexHome.vue"),
  },
  {
    path: "/a",
    name: "a",
    component: () => import("@/views/home/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
