import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "IndexView",
    component: () => import("@/views/IndexView.vue"),
    redirect: "/main",
    children: [
      {
        path: "/user",
        name: "UserLogin",
        component: () => import("@/views/user/UserLogin.vue"),
      },
      {
        path: "/regis",
        name: "UserRegister",
        component: () => import("@/views/user/UserRegister.vue"),
      },
      {
        path: "/main",
        name: "MainList",
        component: () => import("@/views/main/MainList.vue"),
      },
      {
        path: "/more",
        name: "MoreList",
        component: () => import("@/views/main/More.vue"),
      },
      {
        path: "/publish",
        name: "PublishPost",
        component: () => import("@/views/main/PublishPost.vue"),
      },
      {
        path: "/details",
        name: "ListDetails",
        component: () => import("@/views/main/ListDetails.vue"),
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
