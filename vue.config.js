module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @use "@/assets/scss/_color.scss";
          @use "@/assets/scss/_breakpoint.scss";
          @use "@/assets/scss/_typography.scss";
        `,
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/eric-project/" : "/",
};
