<template>
  <div class="mt-8">
    <h2
      class="pb-8 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900"
    >
      Rank by popularity
    </h2>
    <div v-if="books.results">
      <BookList :books="books.results" />
    </div>
  </div>
</template>

<script>
import BookList from "../components/molecules/BookList.vue";

export default {
  components: {
    BookList
  },
  computed: {
    books() {
      return this.$store.getters.books;
    }
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        await this.$store.dispatch("fetchBooks");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
