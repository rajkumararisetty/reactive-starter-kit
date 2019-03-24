/* eslint-disable */
const merge = require('webpack-merge');
// Plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
// Configs
const baseConfig = require('./webpack.base.config');

const devConfiguration = env => {
  return merge([
    {
      module: {
        rules: [
          {
            test: /\.(pdf|jpg|png|gif|svg|ico|jpeg)$/,
            use: ['url-loader'],
          },
        ],
      },
      plugins: [
        new MiniCssExtractPlugin(),
        new OptimizeCssAssetsPlugin(),
        new Visualizer({ filename: './statistics.html' }),
      ],
      devServer: {
        host: '127.0.0.1',
      },
    },
  ]);
};

module.exports = env => {
  return merge(baseConfig(env), devConfiguration(env));
};
