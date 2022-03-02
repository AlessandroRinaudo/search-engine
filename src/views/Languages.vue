<template>
  <main>
    <h2
      class="text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900"
    >
      Choose a language
    </h2>
    <div class="flex flex-row flex-wrap mt-5">
      <div class="p-6 my-6 border">
        <router-link to="/language/all"> All </router-link>
      </div>
      <div
        v-for="lang in $store.state.languages"
        :key="lang"
        class="p-6 my-6 border"
      >
        <router-link :to="'/language/' + lang">
          {{ lang }}
        </router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("fetchLanguages");
  }
};
</script>
