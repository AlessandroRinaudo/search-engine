import Home from "./views/Home.vue";
import Books from "./views/Books.vue";
import Book from "./views/Book.vue";
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
  { path: "/books/:id", component: Book, meta: { title: "Book" } },
  { path: "/popular/:page", component: Popular, meta: { title: "Popular" } },
  { path: "/languages", component: Languages, meta: { title: "Languages" } },
  { path: "/languages/:lang", component: Books, meta: { title: "Books" } },
  { path: "/categories", component: Categories, meta: { title: "Categories" } },
  { path: "/categories/:category", component: Books, meta: { title: "Category" } },
  { path: "/authors", component: Authors, meta: { title: "Authors" } },
  { path: "/authors/:name", component: Books, meta: { title: "Name" } },
  { path: "/random", component: Random, meta: { title: "Random" } },
  { path: "/about", component: About, meta: { title: "About us" } },
  { path: "/:path(.*)", component: NotFound }
];
