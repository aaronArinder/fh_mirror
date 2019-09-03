// https://medium.com/js-dojo/how-to-configure-webpack-4-with-vuejs-a-complete-guide-209e943c4772

'use strict';

const VueLoaderPlugin      = require('vue-loader/lib/plugin');
const HtmlPlugin           = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const helpers              = require('./helpers');
const isDev                = process.env.NODE_ENV === 'development';

const webpackConfig = {
  entry: {
    polyfill: '@babel/polyfill',
    main: helpers.root('client', 'src', 'main.js'),
  },
  resolve: {
    extensions: [ '.js', '.vue' ],
    alias: {
      'vue$': isDev ? 'vue/dist/vue.runtime.js' : 'vue/dist/vue.runtime.min.js',
      '@': helpers.root('client', 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [ helpers.root('client', 'src') ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ helpers.root('client', 'src') ]
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
        ]
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              fiber: require('fibers'),
            }
          }
        ]
      },

      // {
      //   test: /\.scss$/,
      //   use: [
      //     isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
      //     { loader: 'css-loader', options: { sourceMap: isDev } },
      //     { loader: 'sass-loader', options: { sourceMap: isDev } }
      //   ]
      // },
      // {
      //   test: /\.sass$/,
      //   use: [
      //     isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader,
      //     { loader: 'css-loader', options: { sourceMap: isDev } },
      //     { loader: 'sass-loader', options: { sourceMap: isDev } }
      //   ]
      // }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({ template: 'index.html', chunksSortMode: 'dependency' }),
    new MiniCSSExtractPlugin({
      filename: `styles/[name].css`
    }),
  ]
};

module.exports = webpackConfig;

