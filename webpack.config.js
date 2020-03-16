const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")


//清理 dist 目录
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')


// rules
const rules = [
  // html-loader
    {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
    },
    // css-loader
    {
        test: /\.css$/,
        use: [ 
            MiniCssExtractPlugin.loader, 
            'css-loader' ,
            {
              // 样式补全 loader
              loader: "postcss-loader",
              options: {
                ident: 'postcss',
                plugins: ()=>[
                  require('postcss-preset-env')()
                ]
              }
            }
        ]
    },
    // 图片 loader
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
    // babel-loader, code.js处理兼容问题
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
                ie: '8', 
                safari: '10', 
                edge: '17' 
              } 
            } 
          ] 
        ] 
      }
    }
]
// 热更新
const devserver = {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000,
  host: "localhost"
  // hot: true
}


module.exports = {

  entry: { 
        index: './src/js/index.js',
        header: './src/js/header.js',
        footer: './src/js/footer.js',
        donggan: './src/js/donggan.js',
        dongqing: './src/js/dongqing.js',
        dongshen: './src/js/dongshen.js',
        dongtai: './src/js/dongtai.js',
        dongxin: './src/js/dongxin.js',
        jike: './src/js/jike.js',
        jianshi: './src/js/jianshi.js',
        chengxi_class: './src/js/chengxi_class.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',  
      template: './src/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'header.html',  
      template: './src/header.html',
      chunks: ['header']
    }),
    new HtmlWebpackPlugin({
      filename: 'footer.html',  
      template: './src/footer.html',
      chunks: ['footer']
    }),
    new HtmlWebpackPlugin({
      filename: 'donggan.html',  
      template: './src/donggan.html',
      chunks: ['donggan']
    }),
    new HtmlWebpackPlugin({
      filename: 'dongqing.html',  
      template: './src/dongqing.html',
      chunks: ['dongqing']
    }),
    new HtmlWebpackPlugin({
      filename: 'dongshen.html',  
      template: './src/dongshen.html',
      chunks: ['dongshen']
    }),
    new HtmlWebpackPlugin({
      filename: 'dongtai.html',  
      template: './src/dongtai.html',
      chunks: ['dongtai']
    }),
    new HtmlWebpackPlugin({
      filename: 'dongxin.html',  
      template: './src/dongxin.html',
      chunks: ['dongxin']
    }),
    new HtmlWebpackPlugin({
      filename: 'jike.html',  
      template: './src/jike.html',
      chunks: ['jike']
    }),
    new HtmlWebpackPlugin({
      filename: 'jianshi.html',  
      template: './src/jianshi.html',
      chunks: ['jianshi']
    }),
    new HtmlWebpackPlugin({
      filename: 'chengxi_class.html',  
      template: './src/chengxi_class.html',
      chunks: ['chengxi_class']
    }),
    

    //清理 dist 文件夹
    // new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin()
    
    // new webpack.DllReferencePlugin({
    //     manifest: resolve(__dirname,'dll/manifest.json')
    // }),
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: resolve(__dirname,'dll/jquery.js')
    // })
  ],

  optimization: { splitChunks: { chunks: 'all' } },

  //热更新
  devServer: devserver,
  // loaders
  module: { rules: rules },
  // 模式
  mode: "production",
};
