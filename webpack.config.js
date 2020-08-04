var path = require('path')
var webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = [
  {
    // entry: ['./app.scss', './src/main.js'],
    entry: './src/main.js',
    output: {
      // This is necessary for webpack to compile
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename: 'bundle.js',
    },
    devServer: {
      historyApiFallback: true, //historyApiFallback 设置为 true 那么所有的路径都执行 index.html
      overlay: true, // 将错误显示在 html 之上
      proxy: {
        '/api/': {
          target: 'http://localhost:3000',
          pathRewrite: { '/api/': '' },
          changeOrigin: true,
          secure: false,
        },
      },
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
          test: /\.scss$/,
          use: [
            {
              loader: 'vue-style-loader',
            },
            // { loader: 'extract-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()],
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
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env'],
          },
        },
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
      // 请确保引入这个插件！
      new VueLoaderPlugin(),
    ],
  },
]