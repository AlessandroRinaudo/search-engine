<template>
  <div class="mt-8">
    <div class="flex flex-row-reverse">
      <button
        type="button"
        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="isRegexSearch = !isRegexSearch"
      >
        {{ isRegexSearch ? "Switch Simple Search" : "Switch Advanced Search" }}
      </button>
    </div>
    <div v-if="!isRegexSearch">
      <div class="pt-4">
        <div
          class="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start border-t border-b sm:border-gray-200 py-5"
        >
          <label for="book" class="block text-sm font-medium text-gray-700">
            Find your book
          </label>
          <div class="sm:col-span-2">
            <div>
              <input
                id="book"
                v-model="searchText"
                type="text"
                name="book"
                autocomplete="given-name"
                class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <!-- @keyup.enter="submit()" -->
            </div>
            <p id="book-description" class="mt-2 text-sm text-gray-500">
              example : alice adventure
            </p>
          </div>
          <router-link
            class="sm:col-span-1 sm:w-16 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :to="{
              query: { q: searchText, page: 1, limit: limit }
            }"
          >
            Search
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="pt-4">
        <div
          class="sm:grid sm:grid-cols-4 sm:gap-4 sm:items-start border-t border-b sm:border-gray-200 py-5"
        >
          <label for="book" class="block text-sm font-medium text-gray-700">
            Using regular expression
          </label>
          <div class="sm:col-span-2">
            <div>
              <input
                id="book"
                v-model="searchText"
                type="text"
                name="book"
                class="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <!-- @keyup.enter="submit()" -->
            </div>
            <p id="book-description" class="mt-2 text-sm text-gray-500">
              example : [alice*] please don't forget to add brackets []
            </p>
          </div>
          <router-link
            class="sm:col-span-1 sm:w-16 ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            :to="{
              query: { q: searchText, page: 1, limit: limit }
            }"
          >
            Search
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="word" class="my-4 text-sm font-medium text-gray-700">
      Results for {{ word }} :
    </div>
    <div v-if="books.results">
      <BookList :books="books.results" />
      <!-- <PaginationSearch
        :books="books"
        :page="page"
        :page-name="`search?q=${word}`"
      /> -->
    </div>
  </div>
</template>
<script>
import BookList from "../components/molecules/BookList.vue";
// import PaginationSearch from "../components/molecules/PaginationSearch.vue";

export default {
  components: {
    BookList
    // PaginationSearch
  },
  data: () => ({
    isRegexSearch: false,
    searchText: ""
  }),
  computed: {
    books() {
      return this.$store.state.books;
    },
    page() {
      return this.$route.query.page;
    },
    word() {
      return this.$route.query.q;
    },
    limit() {
      return this.$route.query.limit;
    }
  },
  mounted() {
    this.fetchSearch();
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchSearch();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  methods: {
    async fetchSearch() {
      try {
        await this.$store.dispatch("fetchSearch", {
          page: this.page,
          word: this.word
        });
      } catch (error) {
        console.log(error);
      }
    }
    // submit() {
    //   return this.$router.push({
    //     name: "Search",
    //     params: { q: this.searchText, page: 1, limit: this.limit }
    //   });
    // }
  }
};
</script>
