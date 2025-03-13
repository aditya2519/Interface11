import { createRouter, createWebHistory } from "vue-router";
import BlogList from "../components/BlogList.vue";
import BlogForm from "../components/BlogForm.vue";

const routes = [
  { path: "/", component: BlogList },
  { path: "/add", component: BlogForm },
  { path: "/edit/:id", component: BlogForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

