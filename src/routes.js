import Home from "./views/Home.vue";
import Books from "./views/Books.vue";
import Popular from "./views/Popular.vue";
import Languages from "./views/Languages.vue";
import Categories from "./views/Categories.vue";
import Authors from "./views/Authors.vue";
import Random from "./views/Random.vue";
import About from "./views/About.vue";
import NotFound from "./views/NotFound.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: "/", component: Home, meta: { title: "Gutenberg" } },
  { path: "/popular", component: Popular, meta: { title: "Popular" } },
  { path: "/language", component: Languages, meta: { title: "Languages" } },
  { path: "/language/:lang", component: Books, meta: { title: "Books" } },
  { path: "/category", component: Categories, meta: { title: "Categories" } },
  { path: "/category/:cat", component: Books, meta: { title: "Category" } },
  { path: "/author", component: Authors, meta: { title: "Authors" } },
  { path: "/author/:name", component: Books, meta: { title: "Name" } },
  { path: "/random", component: Random, meta: { title: "Random" } },
  { path: "/about", component: About, meta: { title: "About us" } },
  { path: "/:path(.*)", component: NotFound }
];
