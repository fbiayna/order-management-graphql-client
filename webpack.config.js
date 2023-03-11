/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              },
              {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
              },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true,
    },
    plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
}