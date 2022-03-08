<template>
  <div class="mt-8">
    <div class="max-w-2xl p-4 mx-auto lg:max-w-7xl">
      Detail book
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
