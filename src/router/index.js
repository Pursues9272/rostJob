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
        path: "/userlist",
        name: "UserList",
        component: () => import("@/views/user/UserList.vue"),
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
        path: "/products",
        name: "Products",
        component: () => import("@/views/main/Products.vue"),
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
      {
        path: "/shopping",
        name: "Shopping",
        component: () => import("@/views/shopping/Home.vue"),
      },
      {
        path: "/address",
        name: "Address",
        component: () => import("@/views/address/index.vue"),
      },
      {
        path: "/addressAdd",
        name: "AddressAdd",
        component: () => import("@/views/address/AddressAdd.vue"),
      },
      {
        path: "/periphery",
        name: "Periphery",
        component: () => import("@/views/main/Periphery.vue"),
      },
      // 
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
