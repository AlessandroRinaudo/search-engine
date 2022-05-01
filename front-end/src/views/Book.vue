<template>
  <div class="mt-8">
    <BookDetail :book="book" :suggested="suggestedBooks" />
  </div>
</template>
<script>
import BookDetail from "../components/molecules/BookDetail.vue";
export default {
  components: {
    BookDetail
  },
  data() {
    return {
      id: this.$route.params.id
    };
  },
  computed: {
    book() {
      return this.$store.getters.book;
    },
    suggestedBooks() {
      return this.$store.getters.suggestedBooks;
    }
  },
  created() {
    // watch the path of the route to fetch the data again
    this.$watch(
      () => this.$route.params.id,
      () => {
        this.fetchBook(this.id);
        this.fetchSuggestedBooks(this.id);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    );
  },
  mounted() {
    this.fetchBook(this.id);
    this.fetchSuggestedBooks(this.id);
  },
  methods: {
    async fetchBook() {
      try {
        await this.$store.dispatch("fetchBook", this.id);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSuggestedBooks() {
      try {
        await this.$store.dispatch("fetchSuggestedBooks", this.id);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
