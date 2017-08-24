import * as fs from 'fs';
import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, HotModuleReplacementPlugin, optimize } from 'webpack';
import { CheckerPlugin, TsConfigPathsPlugin } from 'awesome-typescript-loader';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

const context = path.join(__dirname, 'src');

const games = {
};

const examples = {
  'examples/physics': 'Examples/physics.ts',
  'examples/test': 'Examples/test.ts'
};

const config: Configuration = {

  context,

  entry: {
    // Web
    index: 'Web/main.ts',
    // Games
    ...games,
    ...examples
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
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

    new HtmlWebpackPlugin({ chunks: ['commons', 'index'] }),

    ...Object.keys(games).map(name =>
      new HtmlWebpackPlugin({ chunks: ['commons', name], filename: `${name}.html` })),

    ...Object.keys(examples).map(name =>
      new HtmlWebpackPlugin({ chunks: ['commons', name], filename: `${name}.html` })),

    new optimize.CommonsChunkPlugin({
      name: 'commons',
      chunks: [
        ...Object.keys(games),
        ...Object.keys(examples)
      ]
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
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
