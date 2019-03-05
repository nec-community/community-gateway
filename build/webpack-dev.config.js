const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/index.jsx',
  devtool: 'inline-source-map',
  node: {
    fs: 'empty',
    tls: 'empty',
    net: 'empty',
  },
  devServer: {
    hot: true,
  },
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/, loaders:[
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: { emitWarning: true, emitError: false }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              optipng: {
                optimizationLevel: 7,
                interlaced: false,
              },
            }
          },
        ]
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]!sass-loader?outputStyle=expanded&sourceMap'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    HtmlWebpackPluginConfig,
    new webpack.DefinePlugin({
      'process.env': {
        env: '"development"'
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FaviconsWebpackPlugin(path.resolve('nec.png')),
    new WriteFilePlugin({
      test: /^(images|videos)/,
    }),
    new CopyWebpackPlugin([
      {
        from: './src/constants/images/',
        to: 'images/',
      },
      {
        from: './src/constants/videos/',
        to: 'videos/',
      },
    ])
  ]
};
