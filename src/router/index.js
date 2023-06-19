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
          import(
            /* webpackChunkName: "home" */ "@/views/accsess/LoginPage.vue"
          ),
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import(
            /* webpackChunkName: "home" */ "@/views/accsess/RegisterPage.vue"
          ),
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
