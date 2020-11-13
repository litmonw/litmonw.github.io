const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

let config
/* 打包生成 vue-ssr-server-bundle.json */
config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../src/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  /* 在 Node 端，如 Vue 库只需要在导出的文件 require 引用 node_modules 文件。
   * 否则会在打包出来的 js 中有单独的一份 Vue 代码，与 node_modules 为两份代码，会造成内存浪费等问题。
   */
  externals: Object.keys(require('../package.json').dependencies),
  // modules: {
  //   rules: [
       
  //   ]
  // },
  plugins: [
    new VueServerPlugin()
  ]
})

module.exports = config