<<<<<<< HEAD
// const { defineConfig } = require("@vue/cli-service");
//
// module.exports = defineConfig({
//   transpileDependencies: true,
//   lintOnSave: false,
// });
=======
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: false,
      },
    },
  },
});
>>>>>>> 63176bd29ad605ef1db311f9fe2a4fa42e2dd090
