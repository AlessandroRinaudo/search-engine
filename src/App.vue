<template>
  <div>
    <nav class="bg-gray-800">
      <div class="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="w-8 h-8" src="/img/logos/swam.svg" alt="Logo" />
            </div>
            <div class="block">
              <div class="flex items-baseline ml-10">
                <router-link
                  v-for="(link, i) in links"
                  :key="i"
                  v-slot="{ navigate, href, isExactActive }"
                  :to="link.to"
                  custom
                >
                  <a
                    :href="href"
                    class="px-3 py-2 text-sm font-medium rounded-md"
                    :class="[
                      isExactActive
                        ? 'text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700',
                      i > 0 && 'ml-4'
                    ]"
                    @click="navigate"
                    >{{ link.text }}</a
                  >
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-screen-xl mx-auto sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    showMenu: false,
    showProfileMenu: false,
    links: [
      {
        text: "Gutenberg",
        to: "/"
      },
      {
        text: "Top 100",
        to: "/popular"
      },
      {
        text: "Language",
        to: "/languages"
      },
      {
        text: "Category",
        to: "/categories"
      },
      {
        text: "Author",
        to: "/authors"
      },
      {
        text: "Random",
        to: "/random"
      },
      {
        text: "About us",
        to: "/about"
      },
    ]
  })
});
</script>
