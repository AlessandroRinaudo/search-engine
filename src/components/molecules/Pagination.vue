<template>
  <nav
    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">
          {{ Number(page) * books.results.length - 31 }}
        </span>
        to
        <span class="font-medium">
          {{ Number(page) * books.results.length }}
        </span>
        of
        <span class="font-medium">{{ books.count }}</span>
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <a
        v-if="books.previous"
        :href="`/popular/${Number(page) - 1}`"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Previous
      </a>
      <a
        v-if="books.next"
        :href="`/popular/${Number(page) + 1}`"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Next
      </a>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    books: {
      type: Object,
      required: true
    },
    page: {
      type: String,
      default: "1"
    }
  }
};
</script>
