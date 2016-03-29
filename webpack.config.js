var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var __dirscripts = path.resolve(__dirname, 'app/js');
var __dirbuild = path.resolve(__dirname, 'build');
var __dirimg = path.resolve(__dirname, 'app/img');
var __dirstyles = path.resolve(__dirname, 'app/styles');

var autoprefixer = require('autoprefixer');

function getPlugins(env) {
  var plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.ProvidePlugin({
      'Promise': 'exports?self.Promise!es6-promise',
      'fetch': 'exports?self.fetch!whatwg-fetch'
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify(env) }
    })
  ];
  
  switch (env) {
    case 'development':
      plugins.push(new webpack.HotModuleReplacementPlugin());
      plugins.push(new webpack.NoErrorsPlugin());
      break;
    case 'production':
      plugins.push(new webpack.optimize.DedupePlugin());
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true
      }));
      plugins.push(new CopyWebpackPlugin([{
        from: 'app/index.html'
      }, {
        from: 'app/data',
        to: 'data'
      }]));
  }

  return plugins;
}

function getEntry(env) {
  var entry = {
    app: [],
    vendor: ['react', 'react-router', 'jquery', 'fullpage.js', 'moment']
  };

  if (env == 'development') { //only want hot reloading when in dev.
    entry.app.push('webpack-hot-middleware/client');
  }
  entry.app.push(path.resolve(__dirscripts, 'app.js'));

  return entry;
}

module.exports = function() {
  console.log('NODE_ENV: ', process.env.NODE_ENV);
  var env = process.env.NODE_ENV || 'development';
  var isDEV = (env == 'development');

  return {
    entry: getEntry(env),
    noInfo: true,
    debug: isDEV,
    output: {
      path: __dirbuild,
      filename: '[name].bundle.js',
      publicPath: ''
    },
    plugins: getPlugins(env),
    module: {
      preLoaders: [{
        include: __dirscripts,
        test: /\.(js|jsx)$/,
        loaders:['eslint-loader']
      }],
      loaders: [{
        include: __dirscripts,
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader']
      }, {
        test: /\.(css|scss)$/,
        loaders: (env == 'production') 
          ? ['style', 'css?sourceMap&minimize', 'postcss', 'sass?sourceMap']
          : ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
      }, {
        include: __dirimg,
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['url-loader?name=img/[hash].[ext]&limit=8192', 'image-webpack-loader?bypassOnDebug=true&optimizationLevel=7']
      }, {
        include: __dirstyles, 
        test: /\.svg$/, 
        loader: 'url?limit=65000&mimetype=image/svg+xml&name=font/[name].[ext]'
      }, {
        include: __dirstyles, 
        test: /\.woff$/, 
        loader: 'url?limit=65000&mimetype=application/font-woff&name=font/[name].[ext]' 
      }, {
        include: __dirstyles, 
        test: /\.woff2$/, 
        loader: 'url?limit=65000&mimetype=application/font-woff2&name=font/[name].[ext]'
      }, {
        include: __dirstyles, 
        test: /\.[ot]tf$/, 
        loader: 'url?limit=65000&mimetype=application/octet-stream&name=font/[name].[ext]'
      }, {
        include: __dirstyles, 
        test: /\.eot$/, 
        loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=font/[name].[ext]'
      }]
    },
    postcss: function() {
      return [autoprefixer];
    },
    eslint: {
      configFile: './.eslintrc'
    },
    devtool: 'eval-source-map'
  };
}
