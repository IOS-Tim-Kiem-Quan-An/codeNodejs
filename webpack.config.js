var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true
  },
  entry: [
    'webpack-hot-middleware/client',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve:{
    root:__dirname,
    alias:{
    }
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js|\.jsx$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader",
      }
    ]
  }
}
