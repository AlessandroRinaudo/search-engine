<template>
  <div class="mt-8">
    <h2
      class="pb-8 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900"
    >
      Rank by popularity
    </h2>
    <BookList :books="books.results" />
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
      return this.$store.state.books;
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchBooks");
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
