<template>
  <div class="relative overflow-hidden bg-white">
    <div class="mx-auto max-w-7xl">
      <div
        class="relative z-10 pt-1 pb-8 bg-white sm:pb-14 lg:max-w-2xl lg:w-full"
      >
        <svg
          class="absolute inset-y-0 right-0 hidden w-48 h-full text-white transform translate-x-1/2 lg:block"
          fill="currentColor"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
        <main
          class="px-4 mx-auto mt-10 max-w-7xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28"
        >
          <div class="sm:text-center lg:text-left">
            <h1
              class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              <span class="block text-indigo-600 xl:inline">Break down</span>
              <span class="block xl:inline">
                the bars of ignorance and illiteracy.</span
              >
            </h1>
            <p
              class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
            >
              Project Gutenberg’s bookshelves are hand-curated collections of
              eBooks that have similar topics.
            </p>
            <div class="mt-10 sm:mt-12">
              <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
                <div class="sm:flex">
                  <div class="min-w-0 flex-1">
                    <label for="book" class="sr-only">Enter a book</label>
                    <input
                      id="book"
                      type="string"
                      placeholder="Tape something..."
                      class="block w-full px-4 py-3 rounded-md border border-gray-300 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700"
                    />
                  </div>
                  <div class="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      type="submit"
                      class="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div
              class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
            >
              <div class="rounded-md">
                <router-link
                  class="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200"
                  to="/languages"
                >
                  Find books by language
                </router-link>
              </div>
            </div>
            <div
              class="flex flex-col items-center justify-center mt-5 sm:items-start sm:justify-start"
            >
              <a
                href="https://www-apr.lip6.fr/~buixuan/daar2021"
                class="text-base text-gray-500 hover:text-indigo-900"
              >
                DAAR
              </a>
              <a
                href="https://gitlab.alessandroserver.com/search-engine/front"
                class="text-base text-gray-500 hover:text-indigo-900"
              >
                App repository
              </a>
              <a
                href="https://www.gutenberg.org/"
                class="text-base text-gray-500 hover:text-indigo-900"
              >
                The Gutenberg project
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
    <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <img
        class="object-cover w-full h-56 sm:h-72 md:h-96 lg:h-full"
        src="/img/book.jpg"
        alt="Image de couverture"
      />
    </div>
  </div>
</template>
