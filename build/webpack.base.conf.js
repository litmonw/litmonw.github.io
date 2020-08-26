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
    publicPath: '/',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src'),
      '@assets': path.resolve('./src/assets'),
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
        exclude: /node_modules/,
        loader: 'babel-loader',
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
        test: /\.(jpe?g|png|gif|ttf|eot|woff|woff2|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 3 * 1024,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          // 小于 10kB(10240字节）的内联文件
          limit: 10 * 1024,
          // 移除 url 中的引号
          // (在大多数情况下它们都不是必要的)
          noquotes: true,
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'image-webpack-loader',
        // 在其它 loader 之前应用该 loader，
        enforce: 'pre',
      },
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
