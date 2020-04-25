const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vue.js',
    library: 'Vue',
    libraryExport: "default",
    libraryTarget: 'umd'
  },
  devtool: 'source-map'
};