const path = require('path');

module.exports = {
  entry: `${__dirname}/client/src/index.js`,
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{ test: /\.js$/, use: 'babel-loader' }],
  },
  mode: 'development',
};