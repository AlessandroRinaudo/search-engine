<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-screen-xl w-full px-4 mx-auto sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="w-8 h-8" src="/img/logos/swam.svg" alt="Logo" />
            </div>
            <div class="flex justify-between">
              <div class="block">
                <div class="flex items-baseline ml-10">
                  <router-link
                    v-for="(link, i) in links"
                    :key="i"
                    v-slot="{ navigate, href, isExactActive }"
                    :to="link.to"
                    custom
                  >
                    <a
                      :href="href"
                      class="px-3 py-2 text-sm font-medium rounded-md"
                      :class="[
                        isExactActive
                          ? 'text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                          : 'text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
                        i > 0 && 'ml-4'
                      ]"
                      @click="navigate"
                      >{{ link.text }}</a
                    >
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- Search section -->
          <div class="flex">
            <div class="flex-1 flex justify-center lg:justify-end">
              <div class="w-full px-2">
                <label for="book" class="sr-only">Search</label>
                <div
                  class="relative text-indigo-200 focus-within:text-gray-400"
                >
                  <input
                    id="book"
                    v-model="searchText"
                    type="text"
                    name="book"
                    placeholder="Search something..."
                    class="block w-full pl-3 pr-3 py-2 border border-transparent rounded-md leading-5 bg-indigo-400 bg-opacity-25 text-indigo-100 placeholder-indigo-200 focus:outline-none focus:bg-white focus:ring-0 focus:placeholder-gray-400 focus:text-gray-900 sm:text-sm"
                    @keyup.enter="submit()"
                  />
                </div>
              </div>
            </div>
            <a
              class="px-3 py-2 text-sm font-medium rounded-md cursor-pointer"
              :class="[
                isExactActive
                  ? 'text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700'
              ]"
              :href="`/search?q=${searchText}&page=1`"
            >
              <svg
                class="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-screen-xl mx-auto px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    showMenu: false,
    showProfileMenu: false,
    links: [
      {
        text: "Gutenberg",
        to: "/"
      },
      {
        text: "Top 100",
        to: "/popular/1"
      },
      {
        text: "Language",
        to: "/languages"
      },
      {
        text: "Category",
        to: "/categories"
      },
      {
        text: "Random",
        to: "/random"
      },
      {
        text: "About us",
        to: "/about"
      }
    ],
    searchText: ""
  }),
  methods: {
    submit() {
      return (window.location.href = `/search?q=${this.searchText}&page=1`);
    }
  }
});
</script>
