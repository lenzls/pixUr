const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const packagejson = require('../package.json');
const targetFolder = path.resolve(__dirname, '..', 'dist');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: targetFolder,
    },
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: `${packagejson.name} – ${packagejson.description} (${packagejson.version})`
    })],
    module: {
        rules: [
            {
                test: /\.png$/,
                use: [
                    { 
                        loader: 'file-loader' ,
                    },
                ]
            }
        ]
    },
    devServer: {
        port: 9001,
    },
    devtool: '#source-map',
};
