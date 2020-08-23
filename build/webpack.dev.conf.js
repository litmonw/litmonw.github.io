const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    historyApiFallback: true, // 所有的 404 请求都会响应 index.html 的内容
    overlay: true, // 编译器错误或警告在浏览器中全屏覆盖
    proxy: {
      '/api/': {
        target: 'http://localhost:3000',
        pathRewrite: { '/api/': '' },
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

