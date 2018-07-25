// webpack v4
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // entry point is where webpack starts creating dependencies tree. Webpack recursively goues through the imported files to create a bundle file.
  entry: { 
      main: './src/index.js' 
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // here we tell webpack where do we want our bundled file to be saved
    filename: '[name].[chunkhash].js' // name is taken from 'entry' object's keys. If specified below, for style files for example, also is taken from 'plugins' array.
  },
  module: {
    rules: [
      {
        test: /\.js$/, // take all files with this extension 
        exclude: /node_modules/,
        use: {
          loader: "babel-loader" // transpile down to ES5
        }
      },
      {
        test: /\.scss$/,
        // here we have an array of loaders. It goes from right to left!!!
        // 'sass-loader' -> Loads a Sass/SCSS file and compiles it to CSS.
        // 'postcss-loader' -> PostCSS is a tool for transforming CSS with JavaScript. !!! SEPARATE CONFIG FILE IS CREATED FOR THIS LOADER !!!
        // 'css-loader' -> interprets @import and url() like import/require() and will resolve them.
        // 'MiniCssExtractPlugin.loader' -> loader for a plugin
        // 'style-loader' -> Adds CSS to the DOM by injecting a <style> tag
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ), // a plugin to remove/clean your build folder(s) before building
    new MiniCssExtractPlugin({ // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.
      filename: 'style.[contenthash].css',
    }),
    new WebpackMd5Hash(), //Plugin to replace a standard webpack chunkhash with md5

    // tells webpack where to find a template for the final html file further saved in dist folder
    new HtmlWebpackPlugin({ // 
      inject: false,
      hash: false, // adds hash code of the html file after hashcode of the scripts and stylesheets
      template: './src/index.html',
      filename: 'index.html'
    }),
  ]
};
