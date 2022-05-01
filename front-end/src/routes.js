import Home from "./views/Home.vue";
import Books from "./views/Books.vue";
import Book from "./views/Book.vue";
import Popular from "./views/Popular.vue";
import Important from "./views/Important.vue";
import Languages from "./views/Languages.vue";
import Random from "./views/Random.vue";
import About from "./views/About.vue";
import Search from "./views/Search.vue";
import NotFound from "./views/NotFound.vue";

/** @type {import('vue-router').RouterOptions['routes']} */
export let routes = [
  { path: "/", name: 'Home', component: Home, meta: { title: "Gutenberg" } },
  { path: "/books/:id", name: 'Book', component: Book, meta: { title: "Book" } },
  { path: "/popular", name: 'Popular', component: Popular, meta: { title: "Popular" } },
  { path: "/important", name: 'Important', component: Important, meta: { title: "Important" } },
  { path: "/languages", name: 'Languages', component: Languages, meta: { title: "Languages" } },
  { path: "/languages/:lang", name: 'Books', component: Books, meta: { title: "Books" } },
  { path: "/random", name: 'Random', component: Random, meta: { title: "Random" } },
  { path: "/about", name: 'About', component: About, meta: { title: "About us" } },
  {
    path: "/search", name: 'Search', component: Search, props: route => ({ query: route.query.q, page: route.query.page, limit: route.query.limit }), meta: { title: "Find your book" }
  },
  { path: "/:path(.*)", component: NotFound }
];
