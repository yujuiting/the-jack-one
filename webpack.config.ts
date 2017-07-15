import * as fs from 'fs';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

const context = path.join(__dirname, 'src');

const config: Configuration = {

  context,

  entry: './Game/Client/Main.ts',

  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: 'main.bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      context,
      'node_modules'
    ]
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },

  plugins: [
    new CheckerPlugin(),
    new CopyWebpackPlugin([
      { from: 'Assets', to: 'Assets' }
    ]),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin()
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist/client'),
    compress: true,
    port: 9000,
    hot: true,
    clientLogLevel: 'info',
    quiet: true,
    noInfo: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 1000,
      poll: 1000
    }
  }

};

// tslint:disable-next-line no-default-export
export default config;
