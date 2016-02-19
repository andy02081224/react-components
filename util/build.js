var webpack = require('webpack');

var webpackConfigMaker = require('../webpack.config');
var webpackConfig = webpackConfigMaker();

var compiler = webpack(webpackConfig);

compiler.run(function(err, stats) {
  var jsonStats = stats.toJson();

  if (err) {
    console.log(err);
    return;
  }

  if (stats.hasErrors) {
    jsonStats.errors.forEach(function(error) {
      console.log('Error: ', Error);
    });
    return;
  }

  if (stats.hasWarnings) {
    jsonStats.warnings.forEach(function(warning) {
      console.log('Warning: ', warning);
    });
  }

  console.log('Successfully compile production build to build directory');
});
