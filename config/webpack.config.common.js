// https://medium.com/js-dojo/how-to-configure-webpack-4-with-vuejs-a-complete-guide-209e943c4772

'use strict';

const VueLoaderPlugin      = require('vue-loader/lib/plugin');
const HtmlPlugin           = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const helpers              = require('./helpers');
const VuetifyLoaderPlugin  = require('vuetify-loader/lib/plugin');

const isDev                = process.env.NODE_ENV === 'development';

const webpackConfig = {
  entry: {
    polyfill: '@babel/polyfill',
    //main: helpers.root('client', 'src', 'main.js'),
    main: helpers.root('src', 'main.js'),
  },
  resolve: {
    extensions: [ '.js', '.vue' ],
    alias: {
      'vue$': isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
      //'@': helpers.root('client', 'src')
      '@': helpers.root('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        //include: [ helpers.root('client', 'src') ]
        include: [ helpers.root('src') ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //include: [ helpers.root('client', 'src') ]
        include: [ helpers.root('src') ]
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } }
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              fiber: require('fibers'),
              indentedSyntax: true
            }
          }
          //isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          //{ loader: 'css-loader', options: { sourceMap: isDev } },
          //{ loader: 'sass-loader',
          //  options: {
          //    sourceMap: isDev,
          //    fiber: require('fibers'),
          //  }
          //}
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new HtmlPlugin({ template: 'index.html', chunksSortMode: 'dependency' }),
    new MiniCSSExtractPlugin({ filename: `styles/[name].css` }),

  ]
};

module.exports = webpackConfig;
