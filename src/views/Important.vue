<template>
  <div class="mt-8">
    <h2
      class="pb-8 text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900"
    >
      Rank by importance
    </h2>
    <div v-if="importantBooks.results">
      <BookList :books="importantBooks.results" />
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
    importantBooks() {
      return this.$store.getters.importantBooks;
    }
  },
  mounted() {
    this.fetchImportantBooks();
  },
  methods: {
    async fetchImportantBooks() {
      try {
        await this.$store.dispatch("fetchImportantBooks");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
