<template>
  <div class="mt-8">
    <BookDetail :book="book" />
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
      return this.$store.state.book;
    }
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      await this.$store.dispatch("fetchBook", id);
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
