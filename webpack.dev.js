const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve('./build/js'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    watch: false,
    module: {
        rules: [
            { test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-react-jsx'],
                        presets: ['env', 'react']
                    }
                }
            },
            { test: /\.jsx?$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    // plugins: [
    //     HTMLWebpackPluginConfig
    // ],
    devServer: {
        inline: true,
        historyApiFallback: true
    },
};

