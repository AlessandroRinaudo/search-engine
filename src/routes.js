import Home from "./views/Home.vue";
import Books from "./views/Books.vue";
import Languages from "./views/Languages.vue";
import NotFound from "./views/NotFound.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: "/", component: Home, meta: { title: "Gutenberg" } },
  { path: "/language", component: Languages, meta: { title: "Languages" } },
  { path: "/language/:lang", component: Books, meta: { title: "Books" } },
  { path: "/:path(.*)", component: NotFound }
];
