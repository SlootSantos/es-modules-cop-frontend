const path = require('path');
const Webpack = require('webpack');
const bundleName = '[name]-bundle.js';

module.exports = {
  entry: {
    main: ['./src/main.js']
  },
  mode: 'production',
  output: {
    filename: bundleName,
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
};
