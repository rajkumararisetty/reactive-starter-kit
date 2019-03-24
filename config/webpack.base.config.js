const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const APP_DIR = path.resolve(__dirname, '../src'); // <===== new stuff added here

module.exports = env => {
  const { PLATFORM, VERSION } = env;
  return merge([
    {
      entry: ['@babel/polyfill', APP_DIR], // <===== new stuff added here
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.(css)$/,
            exclude: /\.module\.css$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  sourceMap: PLATFORM === 'production',
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    }),
                  ],
                  sourceMap: PLATFORM === 'production',
                },
              },
            ],
            sideEffects: true,
          },
          {
            test: /\.module\.css$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  sourceMap: PLATFORM === 'production',
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    }),
                  ],
                  sourceMap: PLATFORM === 'production',
                },
              },
            ],
          },
          {
            test: /\.(scss|sass)$/,
            exclude: /\.module\.(scss|sass)$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: PLATFORM === 'production',
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    }),
                  ],
                  sourceMap: PLATFORM === 'production',
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: PLATFORM === 'production',
                },
              },
            ],
            sideEffects: true,
          },
          {
            test: /\.module\.(scss|sass)$/,
            use: [
              PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 2,
                  sourceMap: PLATFORM === 'production',
                  modules: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    }),
                  ],
                  sourceMap: PLATFORM === 'production',
                },
              },
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: PLATFORM === 'production',
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
          filename: './index.html',
        }),
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(VERSION),
          'process.env.PLATFORM': JSON.stringify(PLATFORM),
        }),
      ],
    },
  ]);
};
