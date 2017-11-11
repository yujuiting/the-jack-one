import * as path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, HotModuleReplacementPlugin, optimize } from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';

const context = path.join(__dirname, 'src');

const examples = {
  'examples/control-camera': 'Examples/control-camera.ts',
  'examples/manage-cameras': 'Examples/manage-cameras.ts',
  'examples/physics': 'Examples/physics.ts',
  'examples/test': 'Examples/test.ts',
  'examples/flappy-bird': 'Examples/flappy-bird/main.ts'
};

const config: Configuration = {

  context,

  entry: {
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
      { from: 'Examples/Assets', to: 'examples/assets' }
    ]),

    new HotModuleReplacementPlugin(),

    ...Object.keys(examples).map(name =>
      new HtmlWebpackPlugin({ chunks: ['commons', name], filename: `${name}.html` })),

    new optimize.CommonsChunkPlugin({
      name: 'commons',
      chunks: [
        ...Object.keys(examples)
      ]
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    compress: true,
    port: 9000,
    hot: true,
    clientLogLevel: 'info',
    quiet: true,
    noInfo: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000
    }
  }

};

// tslint:disable-next-line no-default-export
export default config;
