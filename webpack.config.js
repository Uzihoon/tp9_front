const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        app: ['@babel/polyfill', './src/Control/index.js'],
        main: ['@babel/polyfill', './src/Control/Main.js'],
        test: ['@babel/polyfill', './src/test.js'],
        user: ['@babel/polyfill', './src/Control/User.js'],
        adminUser: ['@babel/polyfill', './src/Control/AdminUser.js'],
        project: ['@babel/polyfill', './src/Control/Project.js'],
        taskDetail: ['@babel/polyfill', './src/Control/TaskDetail.js'],
    },
    output: {
        path: '/dist',
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env'
                    ]
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    },
};