const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src'),
  entry: {
  	home: './init',
  	styles: './home.scss'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
  	extensions: ['.js']
  },
  watch: true,
  module: {
  	rules: [{
  		test: /\.scss$/,
  		use: ExtractTextPlugin.extract({
  			fallback: 'style-loader',
  			use: ['css-loader', 'sass-loader']
  		})
  	}, {
  		test: /\.jsx?$/,
  		exclude: /node_modules/,
  		use: {
  			loader: 'babel-loader',
  			options: {
  				plugins: ['transform-react-jsx'],
  				presets: ['env']
  			}
  		}
  	}
  	]
  },
  plugins: [
  	new ExtractTextPlugin({ filename: 'style.css',
  		allChunks: true })
  ]
};