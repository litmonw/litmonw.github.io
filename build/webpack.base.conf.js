var path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/', // build 环境不能使用 publicPath
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['*', '.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compileOptions: {
                preserveWhitespace: false,
              },
            },
          },
        ],
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: 'style-loader'
          // },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            // },
          },
        ],
      },
      // `.scss` 文件和 `*.vue` 文件中的
      // `<style lang="scss">` 块都应用它
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'vue-style-loader',
          },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),

              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules'],
              },
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/assets/style/app.scss',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpe?g|gif|ttf|eot|svg|woff|woff2|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
      // {
      //   test: /\.(ttf|eot|svg|woff|woff2|otf)$/,
      //   use: 'url-loader'
      // }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      title: '测试',
      template: './index.html',
      filename: 'index.html',
      favicon: './src/assets/img/favicon.ico',
      inject: true,
    }),
    new StylelintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
      fix: true
    }),
  ],
}
