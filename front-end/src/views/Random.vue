<template>
  <div class="mt-8">
    <h2
      class="text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900"
    >
      Get your random book
    </h2>
    <BookDetail :book="book" />
  </div>
</template>
<script>
import BookDetail from "../components/molecules/BookDetail.vue";
export default {
  components: {
    BookDetail
  },
  computed: {
    book() {
      return this.$store.getters.book;
    },
    booksCount() {
      return this.$store.getters.booksCount;
    },
    booksAvailable() {
      return this.$store.getters.booksAvailable;
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchBooks");
      await this.$store.dispatch("fetchBook", this.randomNumber());
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    randomNumber() {
      let randomPosition = Math.floor(Math.random() * this.booksCount);
      return this.booksAvailable[randomPosition];
    }
  }
};
</script>
