var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    /*  new HtmlWebpackPlugin({
     filename: 'index.html',
     template: 'index.html',
     inject: true
     }), */
    new FriendlyErrorsPlugin(),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'bootstrap.css',
          global: 'bootstrap.css',
          entry: {
            // path:'http://122.112.247.25/fs01/assets/v2/bootstrap/dist/css/bootstrap.min.css',
            path:'https://lincoln-mp-dev.yonyouauto.com/fs01/v2/bootstrap/dist/css/bootstrap.min.css',
            type:'css'
          }

        },
        {
          module: 'jquery',
          global: 'jQuery',
          entry: {
            // path:'http://122.112.247.25/fs01/assets/v2/jquery/dist/jquery.min.js',
            path:'https://lincoln-mp-dev.yonyouauto.com/fs01/v2/jquery/dist/jquery.min.js',
            type:'js'
          }

        },
        {
          module: 'axios',
          global: 'axios',
          entry: {
            // path:'http://122.112.247.25/fs01/assets/v2/axios/dist/axios.min.js',
            path:'https://lincoln-mp-dev.yonyouauto.com/fs01/v2/axios/dist/axios.min.js',
            type:'js'
          }

        },
        {
          module: 'fastclick',
          global: 'fastclick',
          entry: {
            // path:'http://122.112.247.25/fs01/assets/v2/fastclick/lib/fastclick.js',
            path:'https://lincoln-mp-dev.yonyouauto.com/fs01/v2/fastclick/lib/fastclick.js',
            type:'js'
          }

        }
      ]
    })
  ]
})

var pages =  utils.getMultiEntry('./src/'+config.moduleName+'/**/**/*.html');
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname + '.html',
    template: pages[pathname], // 模板路径
    chunks: [pathname, 'vendors', 'manifest'], // 每个html引用的js模块
    inject: true              // js插入位置
  };
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
