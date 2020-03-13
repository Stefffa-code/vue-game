module.exports = {
  chainWebpack: config => {
      config.module.rules.delete('eslint');
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/common.sass";`
      }
    }
  }
}