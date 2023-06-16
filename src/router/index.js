// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "register" */ "@/components/Register.vue"),
      },
    ],
  },
  {
    path: "/to-do",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "list",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/ToDoList.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
