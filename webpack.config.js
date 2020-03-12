const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: { 
        index: './src/js/index.js',
        home: './src/js/home.js',
        mine: './src/js/mine.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].[hash:10].js'
  },
  module: {
    rules:[
        {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader',
            }
        },
        {
            test: /\.css$/,
            use: [ 
                MiniCssExtractPlugin.loader, 
                'css-loader' 
            ]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
                name: '[hash:10].[ext]',
                outputPath: 'images'
              }
            }
          ]
        },
        {
          test: /\.js$/, 
          exclude: /node_modules/, 
          loader: 'babel-loader', 
          options: { 
            // 预设：指示 babel 做怎么样的兼容性处理 
            presets: [ 
              [ 
                '@babel/preset-env', 
                { 
                  // 按需加载 useBuiltIns: 'usage', 
                  // 指定 core-js 版本 
                  corejs: { version: 3 }, 
                  // 指定兼容性做到哪个版本浏览器 
                  targets: { 
                    chrome: '60', 
                    firefox: '60', 
                    ie: '9', 
                    safari: '10', 
                    edge: '17' 
                  } 
                } 
              ] 
            ] 
          }
        }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      minify: {
          collapseWhitespace: true,
          removeComments: true,
      },
      chunk: ['index']
  }),
  new HtmlWebpackPlugin({
      filename: 'home.html',
      template: './src/home.html',
      minify: {
          collapseWhitespace: true,
          removeComments: true,
      },
      chunk: ['home']

  }),
  new HtmlWebpackPlugin({
      filename: 'mine.html',
      template: './src/mine.html',
      minify: {
          collapseWhitespace: true,
          removeComments: true,
      },
      chunk: ['mine']
  }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:10].css',
      }),
      // new webpack.optimize.CommonsChunkPlugin('common.js'),
      new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
      })

  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    host: "localhost"
    // hot: true
  },
  optimization: { splitChunks: { chunks: 'all' } },
  mode: "production"
};
