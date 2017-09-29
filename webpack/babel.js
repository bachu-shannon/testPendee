module.exports = function () {
    return {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'stage-0', 'es2015'],
                        }
                    }
                }
            ]
        }
    }
};