const path = require('path');
const paths = require('./paths');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: ['whatwg-fetch', paths.src + '/main.ts'],

  devtool: 'inline-source-map',

  resolve: {
    extensions: ['.js', '.vue', '.ts'],
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },

  output: {
    path: paths.build,
    filename: 'weather.bundle.js',
    chunkFilename: 'widget.chunk.js',
    publicPath: '/'
  },

  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store', 'index.html']
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new Dotenv()
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ],
        exclude: /node_modules/
      },
      { test: /\.vue$/, use: [{ loader: 'vue-loader', options: { customElement: true } }] },
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },

      {
        test: /\.(scss|css)$/,
        use: ['style-loader', { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } }, { loader: 'postcss-loader', options: { sourceMap: true } }, { loader: 'sass-loader', options: { sourceMap: true } }]
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' }
    ]
  }
};
