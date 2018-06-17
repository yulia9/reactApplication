const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: `${__dirname}/src/index.html`,
  filename: 'index.html',
  inject: 'body',
  hash: true,
});

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './index',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js'],
  },
  watch: false,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['transform-react-jsx'],
            presets: ['env', 'react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    HTMLWebpackPluginConfig,
  ],
};
