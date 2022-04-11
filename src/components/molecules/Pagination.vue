<template>
  <nav
    v-if="books.results.length > 0"
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">
          {{
            books.results.length > limit
              ? Number(page) * books.results.length - limit
              : books.results.length
          }}
        </span>
        to
        <span class="font-medium">
          {{ Number(page) * books.results.length }}
        </span>
        of
        <span class="font-medium">{{ books.count }}</span>
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <router-link
        v-if="Number(page) > 1"
        :to="{
          params: { page: Number(page) - 1 }
        }"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Previous
      </router-link>
      <router-link
        v-if="Number(page) < lastPage"
        :to="{
          params: { page: Number(page) + 1 }
        }"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Next
      </router-link>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    books: {
      type: Object,
      required: true
    },
    page: {
      type: String,
      default: "1"
    },
    pageName: {
      type: String,
      default: "popular"
    }
  },
  data() {
    return {
      lastPage: 2
    };
  },
  computed: {
    limit() {
      return this.$store.state.limit;
    }
  }
  // watch: {
  //   $route(to, from) {
  //     // react to route changes...
  //     this.fetchBooks();
  //   }
  // },
  // methods: {
  //   async fetchBooks() {
  //     try {
  //       console.log(this.lastPage);
  //       await this.$store.dispatch("fetchBooks", this.lastPage);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }
};
</script>
