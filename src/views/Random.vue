<template>
  <div class="mt-8">
    <h2
      class="text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900"
    >
      Get your random book
    </h2>
    <div class="mt-5">
      <div class="py-6">
        <div
          class="lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
        >
          <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <div class="flex">
              <div
                class="hidden sm:block w-40 mr-8 bg-gray-200 rounded-md group-hover:opacity-75"
              >
                <img
                  :src="`https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`"
                  alt="Book cover"
                  class="object-cover object-center w-full h-full lg:w-full lg:h-full"
                />
              </div>
              <div class="flex flex-col">
                <h1
                  class="text-2xl font-extrabold tracking-tight text-gray-900"
                >
                  {{ book.title }}
                </h1>
                <h3 class="mt-4 sm:mt-10 text-sm font-medium text-gray-900">
                  Gutenberg link
                </h3>
                <a
                  :href="`https://www.gutenberg.org/ebooks/${book.id}`"
                  class="mt-4 text-gray-600 text-sm"
                >
                  {{ `https://www.gutenberg.org/ebooks/${book.id}` }}
                </a>
              </div>
            </div>
          </div>

          <div class="mt-4 lg:mt-0 lg:row-span-3">
            <h2 class="sr-only">Book information</h2>
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">Total download</h3>
              <div class="mt-4 text-gray-600 text-sm">
                {{ book.download_count }}
              </div>
            </div>

            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">Author</h3>
              <div class="mt-4">
                <ul
                  v-for="(author, i) in book.authors"
                  :key="`author-${i}`"
                  role="list"
                  class="pl-4 list-disc text-sm space-y-2"
                >
                  <li class="text-gray-400">
                    <span class="text-gray-600">{{ author.name }}</span>
                    <p class="text-gray-600">
                      {{ author.birth_year }} - {{ author.death_year || "-" }}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">Subjects</h3>
              <div class="mt-4">
                <ul
                  v-for="(subject, i) in book.subjects"
                  :key="`subject-${i}`"
                  role="list"
                  class="pl-4 list-disc text-sm space-y-2"
                >
                  <li class="text-gray-400">
                    <span class="text-gray-600">{{ subject }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">Bookshelves</h3>
              <div class="mt-4">
                <ul
                  v-for="(bookshelve, i) in book.bookshelves"
                  :key="`bookshelve-${i}`"
                  role="list"
                  class="pl-4 list-disc text-sm space-y-2"
                >
                  <li class="text-gray-400">
                    <span class="text-gray-600">{{ bookshelve }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-900">Languages</h3>
              <div class="mt-4">
                <ul
                  v-for="(language, i) in book.languages"
                  :key="`language-${i}`"
                  role="list"
                  class="pl-4 list-disc text-sm space-y-2"
                >
                  <li class="text-gray-400">
                    <span class="text-gray-600">{{ language }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            class="lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200"
          >
            <div class="mt-6">
              <h2 class="text-sm font-medium text-gray-900">Download</h2>
              <div class="pr-6">
                <div class="mt-6 flex flex-col">
                  <div class="-my-2 overflow-x-auto">
                    <div class="inline-block min-w-full py-2 align-middle px-2">
                      <div
                        class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                      >
                        <table class="min-w-full divide-y divide-gray-300">
                          <thead class="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Format
                              </th>
                              <th
                                scope="col"
                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Link
                              </th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-gray-200 bg-white">
                            <tr>
                              <td
                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              >
                                epub+zip
                              </td>
                              <td
                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 hover:cursor-pointer"
                              >
                                <a
                                  :href="`https://www.gutenberg.org/ebooks/${book.id}.epub.images`"
                                  class="text-indigo-600 hover:text-indigo-900 truncate"
                                >
                                  {{
                                    `https://www.gutenberg.org/ebooks/${book.id}.epub.images`
                                  }}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              >
                                rdf+xml
                              </td>
                              <td
                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 hover:cursor-pointer"
                              >
                                <a
                                  :href="`https://www.gutenberg.org/ebooks/${book.id}.rdf`"
                                  class="text-indigo-600 hover:text-indigo-900 truncate"
                                >
                                  {{
                                    `https://www.gutenberg.org/ebooks/${book.id}.rdf`
                                  }}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              >
                                x-mobipocket-ebook
                              </td>
                              <td
                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 hover:cursor-pointer"
                              >
                                <a
                                  :href="`https://www.gutenberg.org/ebooks/${book.id}.kindle.images`"
                                  class="text-indigo-600 hover:text-indigo-900 truncate"
                                >
                                  {{
                                    `https://www.gutenberg.org/ebooks/${book.id}.kindle.images`
                                  }}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              >
                                text/html
                              </td>
                              <td
                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 hover:cursor-pointer"
                              >
                                <a
                                  :href="`https://www.gutenberg.org/ebooks/${book.id}.html.images`"
                                  class="text-indigo-600 hover:text-indigo-900 truncate"
                                >
                                  {{
                                    `https://www.gutenberg.org/ebooks/${book.id}.html.images`
                                  }}
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                              >
                                text/plain
                              </td>
                              <td
                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 hover:cursor-pointer"
                              >
                                <a
                                  :href="`https://www.gutenberg.org/file/${book.id}/${book.id}-0.zip`"
                                  class="text-indigo-600 hover:text-indigo-900 truncate"
                                >
                                  {{
                                    `https://www.gutenberg.org/file/${book.id}/${book.id}-0.zip`
                                  }}
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    book() {
      return this.$store.state.book;
    },
    total() {
      return this.$store.state.totalBooks.count;
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchTotalBooks");
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
