const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  publicPath: "./",
  transpileDependencies: true,
  productionSourceMap: false, // 源码加密
  lintOnSave: true, // 关闭严格模式
  devServer: {
    port: 8080, // 端口号配置
    open: false, // 运行自启
    proxy: {
      "/api": {
        target: "http://124.223.184.229:8080",
        // target: "http://127.0.0.1/",
        ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
        // cookieDomainRewrite: {
        //   // localhost: '192.168.10.222:8080'
        //   localhost: "",
        // },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
        views: "@/views",
        assets: "@/assets",
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});
