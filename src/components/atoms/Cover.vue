<template>
  <div class="w-40 mx-auto my-0 bg-gray-200 rounded-md group-hover:opacity-75">
    <img
      :src="`https://www.gutenberg.org/cache/epub/${book.id_book}/pg${book.id_book}.cover.medium.jpg`"
      alt="Book cover"
      class="object-cover object-center w-full h-full max-h-56"
    />
  </div>
  <div class="flex justify-center mt-4">
    <div>
      <h3 class="text-sm font-bold text-gray-900">
        <router-link :to="`/books/${book.id_book}`">
          <span aria-hidden="true" class="absolute inset-0"></span>
          {{ book.title }}
        </router-link>
      </h3>
      <ul
        v-for="(author, i) in book.authors"
        :key="`author-${i}`"
        role="list"
        class="pl-4 text-sm space-y-2"
      >
        <li class="text-gray-400">
          <span class="text-sm italic text-gray-700">{{ author.name }}</span>
          <p class="text-sm italic text-gray-700">
            {{ author.birth_year }} - {{ author.death_year || "-" }}
          </p>
        </li>
      </ul>
      <p class="text-sm italic text-gray-700">
        {{ book.download_count }} downloads
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  }
};
</script>
