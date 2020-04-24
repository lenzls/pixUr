const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const targetFolder = path.resolve(__dirname, '..', 'dist');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: targetFolder,
    },
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    plugins: [new HtmlWebpackPlugin()],
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
};
