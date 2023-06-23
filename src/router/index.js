// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/Access.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/LoginPage.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/RegisterPage.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Dashboard.vue"),
      },
      {
        path: "listdetail/:id",
        name: "ListDetail",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/ListDetail.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
