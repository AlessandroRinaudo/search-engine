module.exports = {
  env: {
    node: true
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    "vue/no-v-html": 0,
    "vue/multi-word-component-names": "off"
  }
};
