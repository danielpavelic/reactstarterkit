import path from 'path';
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import webpackMd5Hash from 'webpack-md5-hash';
import extractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.[chunkhash].js'
  },
  plugins: [
    // Generate hashed css
    new extractTextPlugin('[name].bundle.[contenthash].css'),
    // Hashes filenames for caching purposes
    new webpackMd5Hash(),
    // CommonsChunkPlugin for bundle separation
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // Generate HTML
    new htmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComents: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    // Remove duplicate packages in bundle
    new webpack.optimize.DedupePlugin(),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.css$/, loader: extractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
