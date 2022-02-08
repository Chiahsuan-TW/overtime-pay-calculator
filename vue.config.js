module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @use "@/assets/scss/_color.scss";
        `,
      },
    },
  },
};
