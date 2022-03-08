<template>
  <div class="mt-8">
    <h2
      class="text-4xl font-extrabold leading-10 tracking-tight text-center text-gray-900"
    >
      Get your random book
    </h2>
    <div class="flex flex-row flex-wrap mt-5">
      Hi there ;)
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lang: this.$route.params.lang
    };
  },
  mounted() {
    const lang = this.$route.params.lang;
    if (lang === "all") {
      this.$store.dispatch("fetchBooks");
    } else {
      this.$store.dispatch("fetchBooks", lang);
    }
  }
};
</script>
