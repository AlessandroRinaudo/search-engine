<template>
  <div class="mt-8">
    <h2
      class="text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900"
    >
      Rank by popularity
    </h2>
    <div class="flex flex-row flex-wrap mt-5">
      <div
        v-for="lang in $store.state.languages"
        :key="lang"
        class="p-6 my-6 border"
      >
        <router-link :to="'/languages/' + lang">
          {{ lang }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("fetchLanguages");
  }
};
</script>
