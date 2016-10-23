'use strict'

module.exports = {
  entry: './client/javascripts/application.jsx',
  output: {
    path: './client',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|tmp)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          cacheDirectory: "tmp"
        }
      }
    ]
  }
}

