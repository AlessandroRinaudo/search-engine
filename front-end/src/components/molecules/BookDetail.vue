<template>
  <div class="mt-5 py-6">
    <div
      v-if="book.results"
      class="lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8"
    >
      <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <div class="flex">
          <div
            class="hidden sm:block w-40 mr-8 bg-gray-200 rounded-md group-hover:opacity-75"
          >
            <img
              :src="`https://www.gutenberg.org/cache/epub/${book.results.id_book}/pg${book.results.id_book}.cover.medium.jpg`"
              alt="Book cover"
              class="object-cover object-center w-full h-full lg:w-full lg:h-full"
            />
          </div>
          <div class="flex flex-col">
            <h1 class="text-2xl font-extrabold tracking-tight text-gray-900">
              {{ book.results.title }}
            </h1>
            <div class="mt-6">
              <h2 class="text-sm font-medium text-gray-900">Download</h2>
              <div class="mt-6">
                <div class="-my-2 overflow-x-auto">
                  <div class="inline-block min-w-full py-2 align-middle px-2">
                    <div
                      class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
                    >
                      <table class="min-w-full divide-y divide-gray-300">
                        <thead class="bg-gray-50">
                          <tr class="divide-x divide-gray-200">
                            <th
                              scope="col"
                              class="py-4 px-6 text-left text-xs font-normal text-gray-900"
                            >
                              Ebook Format
                            </th>
                            <th
                              scope="col"
                              class="py-4 px-6 text-left text-xs font-normal text-gray-900"
                            >
                              Text Format
                            </th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                          <tr class="divide-x divide-gray-200">
                            <td
                              class="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900"
                            >
                              <a
                                :href="`https://www.gutenberg.org/ebooks/${book.results.id_book}.epub.images`"
                                class="text-indigo-600 hover:text-indigo-900 truncate"
                              >
                                epub+zip
                              </a>
                            </td>
                            <td
                              class="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900"
                            >
                              <a
                                :href="`https://www.gutenberg.org/ebooks/${book.results.id_book}.html.images`"
                                class="text-indigo-600 hover:text-indigo-900 truncate"
                              >
                                text/html
                              </a>
                            </td>
                          </tr>
                          <tr class="divide-x divide-gray-200">
                            <td
                              class="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900"
                            >
                              <a
                                :href="`https://www.gutenberg.org/ebooks/${book.results.id_book}.kindle.images`"
                                class="text-indigo-600 hover:text-indigo-900 truncate"
                              >
                                x-mobipocket-ebook
                              </a>
                            </td>
                            <td
                              class="whitespace-nowrap py-4 px-6 text-sm font-medium text-gray-900"
                            >
                              <a
                                :href="`https://www.gutenberg.org/file/${book.results.id_book}/${book.results.id_book}-0.zip`"
                                class="text-indigo-600 hover:text-indigo-900 truncate"
                              >
                                text/plain
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

      <div class="mt-4 lg:mt-0 lg:row-span-3">
        <h2 class="sr-only">Book information</h2>
        <div class="mt-6">
          <h3 class="text-sm font-medium text-gray-900">Total download</h3>
          <div class="mt-3 text-gray-600 text-sm">
            {{ book.results.download_count }}
          </div>
        </div>

        <div class="mt-6">
          <h3 class="text-sm font-medium text-gray-900">Author</h3>
          <div class="mt-3">
            <ul
              v-for="(author, i) in book.results.authors"
              :key="`author-${i}`"
              role="list"
              class="pl-4 list-disc text-sm space-y-2"
            >
              <li class="text-gray-400">
                <span class="text-gray-600">{{ author.name }}</span>
                <p class="text-gray-600">
                  {{ author.birth_year }}
                </p>
                <p v-if="author.death_year" class="text-gray-600">
                  {{ "- " + author.death_year }}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="text-sm font-medium text-gray-900">Subjects</h3>
          <div class="mt-3">
            <ul
              v-for="(subject, i) in book.results.subjects"
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
          <div class="mt-3">
            <ul
              v-for="(bookshelve, i) in book.results.bookshelves"
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
          <div class="mt-3">
            <ul
              v-for="(language, i) in book.results.languages"
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
        <div class="mt-6">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Gutenberg link</h3>
          <a
            :href="`https://www.gutenberg.org/ebooks/${book.results.id_book}`"
            class="mt-3 text-indigo-600 text-sm"
          >
            {{ `https://www.gutenberg.org/ebooks/${book.results.id_book}` }}
          </a>
        </div>
      </div>

      <div class="lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200">
        <div class="mt-8 pt-6 border-t border-gray-200">
          <h2 class="text-sm font-medium text-gray-900">Suggested Book</h2>
          <div class="mt-4">
            <div v-if="suggested">
              <BookList :books="suggested" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BookList from "./BookList.vue";
export default {
  components: {
    BookList
  },
  props: {
    book: {
      type: Object,
      required: true,
      default: () => ({
        success: true,
        results: {
          id: 84,
          title: "Frankenstein; Or, The Modern Prometheus",
          authors: [
            {
              name: "Shelley, Mary Wollstonecraft",
              birth_year: 1797,
              death_year: 1851
            }
          ],
          translators: [],
          subjects: [
            "Frankenstein's monster (Fictitious character) -- Fiction",
            "Frankenstein, Victor (Fictitious character) -- Fiction",
            "Gothic fiction",
            "Horror tales",
            "Monsters -- Fiction",
            "Science fiction",
            "Scientists -- Fiction"
          ],
          bookshelves: [
            "Gothic Fiction",
            "Movie Books",
            "Precursors of Science Fiction",
            "Science Fiction by Women"
          ],
          languages: ["en"],
          copyright: false,
          media_type: "Text",
          formats: {
            "application/epub+zip":
              "https://www.gutenberg.org/ebooks/84.epub.images",
            "application/rdf+xml": "https://www.gutenberg.org/ebooks/84.rdf",
            "application/x-mobipocket-ebook":
              "https://www.gutenberg.org/ebooks/84.kindle.images",
            "text/html; charset=utf-8":
              "https://www.gutenberg.org/files/84/84-h.zip",
            "text/html": "https://www.gutenberg.org/ebooks/84.html.images",
            "image/jpeg":
              "https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg",
            "text/plain; charset=utf-8":
              "https://www.gutenberg.org/files/84/84-0.zip"
          },
          download_count: 65549
        }
      })
    },
    suggested: {
      type: Object,
      required: true,
      default: () => ({
        subjects: [],
        bookshelves: [],
        languages: ["undefined"],
        _id: "625499464148c1595e895b59",
        title: "Lord Jim",
        authors: [
          {
            _id: "625499464148c1595e895b5a",
            name: "Joseph Conrad",
            birth_year: 1997
          }
        ],
        translators: [],
        mediatype: "",
        download_count: 924,
        id_book: "5658",
        __v: 0
      })
    }
  }
};
</script>
