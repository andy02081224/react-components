var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var __dirapp = path.resolve(__dirname, 'app');
var __dirbuild = path.resolve(__dirname, 'build');

var autoprefixer = require('autoprefixer');

function getPlugins(env) {
  var plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.OccurenceOrderPlugin(),
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
      }]));
  }

  return plugins;
}

function getEntry(env) {
  var entry = {
    app: [],
    vendor: ['react', 'jquery', 'fullpage.js']
  };

  if (env == 'development') { //only want hot reloading when in dev.
    entry.app.push('webpack-hot-middleware/client');
  }
  entry.app.push(path.resolve(__dirapp, 'app.js'));

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
        include: __dirapp,
        test: /\.(js|jsx)$/,
        loaders:['eslint-loader']
      }],
      loaders: [{
        include: __dirapp,
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader']
      }, {
        test: /\.(css|scss)$/,
        loaders: (env == 'production') 
          ? ['style', 'css?sourceMap&minimize', 'postcss', 'sass?sourceMap']
          : ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['url-loader?name=image/[hash].[ext]&limit=8192', 'image-webpack-loader?bypassOnDebug=true&optimizationLevel=7']
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
