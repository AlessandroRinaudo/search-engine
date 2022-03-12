<template>
  <div class="mt-8">
    <h2
      class="pb-8 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900"
    >
      Rank by popularity
    </h2>
    <div v-if="books.results">
      <BookList :books="books.results" />
      <Pagination :books="books" :page="page" />
    </div>
  </div>
</template>

<script>
import BookList from "../components/molecules/BookList.vue";
import Pagination from "../components/molecules/Pagination.vue";
export default {
  components: {
    BookList,
    Pagination
  },
  computed: {
    books() {
      return this.$store.state.books;
    },
    page() {
      return this.$route.params.page;
    }
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        await this.$store.dispatch("fetchBooks", this.page);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
