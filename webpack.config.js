const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            templateParameters: {
                title: 'Titulo puesto desde webpack',
                header: 'Header desde webpack'
            }
        }),
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: {
                    loader: ['style-loader','css-loader']
                }
            }
        ]
    }
}