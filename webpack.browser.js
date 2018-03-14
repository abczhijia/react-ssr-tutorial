//浏览器端webpack配置

const path = require('path');

module.exports = {
    entry: './src/browser/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'client.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                    },
                },
            },
        ],
    },
};