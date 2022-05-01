import vue from "@vitejs/plugin-vue";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  server: {
    port: 3001,
  },
  plugins: [vue()]
};
