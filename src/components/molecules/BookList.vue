<template>
  <div
    class="grid grid-cols-1 my-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
  >
    <div
      v-for="book in books"
      :key="book.title"
      class="relative p-2 text-center rounded-lg shadow-lg group"
    >
      <Cover :book="book" />
    </div>
  </div>
</template>
<script>
import Cover from "../atoms/Cover.vue";
export default {
  components: {
    Cover
  },
  props: {
    books: {
      type: Object,
      required: true,
      default: () => ({
        count: 67511,
        next: "https://gutendex.com/books/?page=2",
        previous: null,
        results: []
      })
    }
  }
};
</script>
