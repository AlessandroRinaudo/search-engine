<template>
  <main>
    <div class="max-w-2xl p-4 mx-auto lg:max-w-7xl">
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">{{ $route.params.lang + ' books' }}</h2>
      <div class="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div class="relative p-2 text-center rounded-lg shadow group"
             v-for="book in this.$store.state.books"
             v-bind:key="book.title">
          <div class="w-40 mx-auto my-0 bg-gray-200 rounded-md group-hover:opacity-75">
            <img :src="`https://www.gutenberg.org/cache/epub/${book.link}/pg${book.link}.cover.medium.jpg`"
                 alt="Book cover" class="object-cover object-center w-full h-full lg:w-full lg:h-full">
          </div>
          <div class="flex justify-center mt-4">
            <div>
              <h3 class="text-sm font-bold text-gray-900">
                <a :href="'https://www.gutenberg.org/ebooks/' + book.link">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  {{ book.Title }}
                </a>
              </h3>
              <p class="text-sm italic text-gray-700 ">{{ book.Author }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
  export default {
    mounted() {
      const lang = this.$route.params.lang
      if (lang === 'all') {
        this.$store.dispatch('fetchBooks')
      } else {
        this.$store.dispatch('fetchBooks', lang)
      }
    },
    data() {
      return {
        lang: this.$route.params.lang,
      }
    },
  }
</script>