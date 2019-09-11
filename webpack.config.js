const path = require('path');
const clientFolder = path.join(__dirname, './client');
const publicFolder = path.join(__dirname, './public');

module.exports = {
  entry: path.join(clientFolder, 'index.js'),
  mode: 'development',
  output: {
    path: publicFolder,
    filename: 'bundle.js',
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
