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
      return this.$store.state.book;
    },
    total() {
      return this.$store.state.books.count;
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchBooks", 1);
      await this.$store.dispatch("fetchBook", this.randomNumber());
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    randomNumber() {
      return Math.floor(Math.random() * this.total);
    }
  }
};
</script>
