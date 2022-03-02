<template>
  <main>
    <div class="max-w-2xl p-4 mx-auto lg:max-w-7xl">
      <nav class="flex" aria-label="Breadcrumb">
        <ol role="list" class="flex items-center space-x-4">
          <li>
            <div class="flex items-center">
              <a
                href="#"
                class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                <router-link to="/language">Languages</router-link>
              </a>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                class="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <a
                href="#"
                class="ml-4 text-sm font-extrabold text-gray-700 hover:text-gray-900 capitalize"
                aria-current="page"
                >{{ $route.params.lang + " books" }}</a
              >
            </div>
          </li>
        </ol>
      </nav>

      <div
        class="grid grid-cols-1 my-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="book in $store.state.books"
          :key="book.title"
          class="relative p-2 text-center rounded-lg shadow-lg group"
        >
          <div
            class="w-40 mx-auto my-0 bg-gray-200 rounded-md group-hover:opacity-75"
          >
            <img
              :src="`https://www.gutenberg.org/cache/epub/${book.link}/pg${book.link}.cover.medium.jpg`"
              alt="Book cover"
              class="object-cover object-center w-full h-full lg:w-full lg:h-full"
            />
          </div>
          <div class="flex justify-center mt-4">
            <div>
              <h3 class="text-sm font-bold text-gray-900">
                <a :href="'https://www.gutenberg.org/ebooks/' + book.link">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  {{ book.Title }}
                </a>
              </h3>
              <p class="text-sm italic text-gray-700">
                {{ book.Author }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      lang: this.$route.params.lang
    };
  },
  mounted() {
    const lang = this.$route.params.lang;
    if (lang === "all") {
      this.$store.dispatch("fetchBooks");
    } else {
      this.$store.dispatch("fetchBooks", lang);
    }
  }
};
</script>
