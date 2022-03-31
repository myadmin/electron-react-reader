const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 多入口，这在第十七章有讲解
    entry: {
        index: path.resolve(__dirname, '../app/renderer/index.tsx'),
        // setting: path.resolve(
        //     __dirname,
        //     '../app/renderer/windowPages/setting/app.tsx'
        // ),
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        // 这里就需要 jsx 和 tsx 了
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        // 别名配置，在 Electron 中并未用到别名路径，所以拆到 React 这边的配置中
        alias: {
            '@assets': path.join(__dirname, '../', 'assets/'),
            '@src': path.join(__dirname, '../', 'app/renderer'),
            '@common': path.join(__dirname, '../', 'app/renderer/common'),
            '@components': path.join(__dirname, '../', 'app/renderer/components'),
        },
    },
    target: 'electron-renderer',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(jpg|png|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2048,
                            name: '[name]_[hash].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                            },
                        },
                    },
                    'postcss-loader',
                    'less-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: path.resolve(__dirname, '../dist/index.html'),
            chunks: ['index'],
        }),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../app/renderer/windowPages/setting/index.html'),
        //     filename: path.resolve(__dirname, '../dist/setting.html'),
        //     chunks: ['setting'],
        // }),
    ],
};