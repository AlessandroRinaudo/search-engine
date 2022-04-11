<template>
  <div>
    <template v-if="books.length > 0">
      <div
        class="grid grid-cols-1 my-6 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
          v-for="book in books"
          :key="book.title"
          class="relative pb-1 text-center rounded-lg shadow-lg group"
        >
          <Cover :book="book" />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="flex justify-center pt-8">
        <p class="text-4xl font-extrabold text-indigo-600">Oops...</p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight">
              Book not found
            </h1>
            <p class="mt-1 text-base text-gray-500">Please try another book.</p>
          </div>
        </div>
      </div>
    </template>
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
        results: []
      })
    }
  }
};
</script>
