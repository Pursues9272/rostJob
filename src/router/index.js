import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "IndexView",
    component: () => import("@/views/IndexView.vue"),
    redirect: '/main',
    children: [
      {
        path: "/user",
        name: "UserLogin",
        component: () => import("@/views/user/UserLogin.vue"),
      },
      {
        path: "/main",
        name: "MainList",
        component: () => import("@/views/main/MainList.vue"),
      },
      {
        path: "/publish",
        name: "PublishPost",
        component: () => import("@/views/main/PublishPost.vue"),
      },
    ],
  },
  {
    path: "/home",
    name: "IndexHome",
    component: () => import("@/views/IndexHome.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
